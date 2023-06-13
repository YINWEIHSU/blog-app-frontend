const db = require('../models')
const { User, Post, Tag, PostTag, Category } = db
const { generateSlug } = require('../common/utils')

const postController = {
  getPosts: async (req, res) => {
    const posts = await Post.findAll({
      attributes: ['id', 'title', 'content', 'img', 'status', 'createdAt', 'updatedAt', 'slug', 'category_id'],
      include: [
        {
          model: Tag,
          through: { attributes: [] }, // 這將排除 join table 的所有屬性
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']]
    })

    let results = posts.map(post => {
      post = {
        ...post.dataValues,
        tags: post.dataValues.Tags.map(tag => {
          return { tag: tag.dataValues.id, name: tag.dataValues.name }
        })
      }
      delete post.Tags
      return post
    })

    if (!req.user) {
      results = results.filter(post => post.status === 'published')
    }

    return res.status(200).json(results)
  },
  getPost: async (req, res) => {
    const slug = req.params.slug
    const post = await Post.findOne({
      where: { slug },
      include: [
        { model: User, attributes: ['email'] },
        { model: Category, attributes: ['name'] },
        { model: Tag, through: { attributes: [] }, attributes: ['id', 'name'] }
      ]
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Transform post data to match your previous structure and include tags as an array
    const result = {
      id: post.id,
      img: post.img,
      email: post.User.email,
      title: post.title,
      content: post.content,
      category: post.Category.name,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.Tags,
      status: post.status,
      slug: post.slug
    }

    return res.status(200).json(result)
  },
  createPost: async (req, res) => {
    const { title, content, category, tags, status } = req.body

    const userId = req.user.dataValues.id
    const categoryData = await Category.findOne({ where: { name: category } })
    const post = await Post.create({
      title,
      content,
      status,
      UserId: userId,
      CategoryId: categoryData.dataValues.id
    })

    const slug = generateSlug(title, post.id)
    await post.update({ slug })

    const tagPromises = tags.map(tag => Tag.findOrCreate({ where: { name: tag } }))
    const tagObjects = await Promise.all(tagPromises)
    const newTagIds = tagObjects.map(tagObject => tagObject[0].dataValues.id)

    // Tags to be added
    const addPromises = newTagIds.map(tagId => PostTag.create({ postId: post.id, tagId }))
    await Promise.all(addPromises)

    return res.status(201).json(post)
  },
  updatePost: async (req, res) => {
    const { id, title, content, category, tags, status } = req.body

    const categoryData = await Category.findOne({ where: { name: category } })
    const post = await Post.findByPk(id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    await post.update({
      title,
      content,
      status,
      slug: generateSlug(title, id),
      CategoryId: categoryData.dataValues.id
    })

    const tagPromises = tags.map(tag => Tag.findOrCreate({ where: { name: tag } }))
    const tagObjects = await Promise.all(tagPromises)
    const newTagIds = tagObjects.map(tagObject => tagObject[0].dataValues.id)

    const postTags = await PostTag.findAll({ where: { postId: id } })
    const oldTagIds = postTags.map(postTag => postTag.dataValues.tagId)

    // Tags to be removed
    const tagIdsToRemove = oldTagIds.filter(oldTagId => !newTagIds.includes(oldTagId))
    const removePromises = tagIdsToRemove.map(async (tagId) => {
      // delete data in table
      await PostTag.destroy({ where: { postId: id, tagId } })

      // find tag
      const tag = await Tag.findOne({ where: { id: tagId } })

      tag.count -= 1

      if (tag.count <= 0) {
        await tag.destroy()
      } else {
        await tag.save()
      }
    })
    await Promise.all(removePromises)

    // Tags to be added
    const tagIdsToAdd = newTagIds.filter(newTagId => !oldTagIds.includes(newTagId))
    const addPromises = tagIdsToAdd.map(tagId => PostTag.create({ postId: id, tagId }))
    await Promise.all(addPromises)
    return res.status(200).json(post)
  },
  deletePost: async (req, res) => {
    const user = req.user.dataValues
    const postData = await Post.findOne({ where: { slug: req.params.slug } })
    const post = postData.dataValues
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    if (post.UserId !== user.id) {
      return res.status(403).json({ message: 'You are not authorized to do this' })
    }
    // Find all associated PostTags and Tags
    const postTags = await PostTag.findAll({ where: { postId: post.id } })
    const tags = await Tag.findAll({ where: { id: postTags.map(pt => pt.tagId) } })

    // Decrement count for each tag
    for (const tag of tags) {
      tag.count -= 1
      if (tag.count <= 0) {
        await tag.destroy()
      } else {
        await tag.save()
      }
    }

    // Remove PostTags
    await PostTag.destroy({ where: { postId: post.id } })

    // Finally remove the post
    await postData.destroy()

    return res.status(204).json({ message: 'Post deleted' })
  }
}

module.exports = postController
