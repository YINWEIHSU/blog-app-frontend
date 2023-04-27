'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate (models) {
      Post.belongsTo(models.User)
      Post.belongsTo(models.Category)
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
    underscored: true
  })
  return Post
}
