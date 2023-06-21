import React, { useState, useReducer, useEffect, useRef, useContext } from 'react'
import PostContext from '../context/PostContext'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { useLocation, useNavigate } from 'react-router-dom'
import './write.scss'

const CONTENT_ON_CHANGE = 'content-on-change'
const CATEGORY_ON_CHANGE = 'category-on-change'
const TAGS_ON_CHANGE = 'tags-on-change'
const NEW_CATEGORY_INPUT_ON_CHANGE = 'new-category-input-on-change'

const getContentOnChangeState = (state, payload) => {
  const content = payload
  const startIndex = content.indexOf('# ') > -1 ? content.indexOf('# ') + 1 : -1
  const endIndex = content.indexOf('\n', startIndex) > -1 ? content.indexOf('\n', startIndex) : content.length
  const title = startIndex > -1 ? content.substring(startIndex, endIndex) : 'New Article'
  if (title.length > 200) {
    return { ...state, errorMessage: 'Title must be less than 200 characters' }
  }
  return { ...state, title, content, errorMessage: '' }
}

const getCategoryOnChangeState = (state, payload) => {
  const isAddingNewCategory = payload === 'add-new'
  return {
    ...state,
    category: isAddingNewCategory ? state.category : payload,
    isAddingNewCategory,
    errorMessage: ''
  }
}

const getTagsOnChangeState = (state, payload) => {
  return { ...state, tags: payload, errorMessage: '' }
}

const getNewCategoryInputOnChangeState = (state, payload) => {
  return { ...state, newCategoryInput: payload, errorMessage: '' }
}

const reducer = (state, action) => {
  switch (action.type) {
    case CONTENT_ON_CHANGE:
      return getContentOnChangeState(state, action.payload)
    case CATEGORY_ON_CHANGE:
      return getCategoryOnChangeState(state, action.payload)
    case TAGS_ON_CHANGE:
      return getTagsOnChangeState(state, action.payload)
    case NEW_CATEGORY_INPUT_ON_CHANGE:
      return getNewCategoryInputOnChangeState(state, action.payload)
    default:
      return state
  }
}

const Write = () => {
  const [noCategoryWarning, setNoCategoryWarning] = useState(false)
  const { createPost, updatePost, categories, createCategory } = useContext(PostContext)
  const existsArticle = useLocation().state
  const [state, dispatch] = useReducer(reducer, { id: existsArticle?.id, title: existsArticle?.title || 'New Article', content: existsArticle?.content || '# New Article', category: existsArticle?.category || 'choose', tags: existsArticle?.tags.map(item => `#${item.name}`).join(' ') || '', status: existsArticle?.status || 'draft', errorMessage: '', newCategoryInput: '', isAddingNewCategory: false })

  const navigate = useNavigate()
  const textareaRef = useRef(null)
  const handleChange = (event) => {
    setNoCategoryWarning(false)
    dispatch({ type: CONTENT_ON_CHANGE, payload: event })
  }

  const handleSelectChange = (e) => {
    dispatch({ type: CATEGORY_ON_CHANGE, payload: e.target.value })
  }

  const handleTagsChange = (event) => {
    dispatch({ type: TAGS_ON_CHANGE, payload: event.target.value })
  }

  const handleNewCategoryInputChange = (e) => {
    dispatch({ type: NEW_CATEGORY_INPUT_ON_CHANGE, payload: e.target.value })
  }

  const handleConfirmNewCategory = async () => {
    try {
      // Call your API to create a new category
      const newCategory = await createCategory(state.newCategoryInput)

      // If creation is successful, update the category list and selected category
      dispatch({
        type: CATEGORY_ON_CHANGE,
        payload: newCategory.data.name
      })
      // Clear new category input
      dispatch({
        type: NEW_CATEGORY_INPUT_ON_CHANGE,
        payload: ''
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    // dynamically resize textarea
    const textarea = textareaRef.current
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight)
    const paddingTop = parseInt(window.getComputedStyle(textarea).paddingTop)
    const paddingBottom = parseInt(window.getComputedStyle(textarea).paddingBottom)
    const border = parseInt(window.getComputedStyle(textarea).borderWidth)
    const height = textarea.scrollHeight - paddingTop - paddingBottom + border
    const rows = Math.ceil(height / lineHeight)
    textarea.rows = rows
    return () => {
      // reset rows when the content is cleared
      textarea.rows = 1
    }
  }, [state.title, state.content])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 必須選擇分類
    if (state.category === 'choose') {
      setNoCategoryWarning(true)
      return
    }

    const tagsArray = state.tags.length
      ? state.tags.split(' ')
        .filter(tag => tag.startsWith('#'))
        .map(tag => tag.slice(1))
      : []

    try {
      const response = existsArticle ? await updatePost(state.id, { ...state, tags: tagsArray, status: e.target.dataset.name }) : await createPost({ ...state, tags: tagsArray, status: e.target.dataset.name })

      navigate(`/post/${response.data.slug}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='write mt-5 flex gap-5'>
      <div className='content grow-5 flex flex-col gap-5'>
        <textarea
          ref={textareaRef}
          className='w-full whitespace-wrap break-words resize-none text-3xl outline-0'
          placeholder='New Title'
          value={state.title}
          maxLength={255}
          readOnly
        />
        {state.errorMessage && (<div className='text-red-500'>{state.errorMessage}</div>)}
        <div data-color-mode='light'>
          <MDEditor
            value={state.content}
            onChange={handleChange}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]]
            }}
            className='md-editor'
          />
        </div>
        <div>
          <input
            type='text'
            value={state.tags}
            onChange={handleTagsChange}
            placeholder='Enter tags separated by space'
            className='w-full'
          />
        </div>
        <div className='item grow-1 flex flex-col justify-between gap-2'>
          <h1 className='text-xl'>文章類別</h1>
          <select name='category' value={state.category} onChange={handleSelectChange}>
            <option value='choose' disabled>選擇分類</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
            <option value='add-new'>新增分類</option>
          </select>
          {noCategoryWarning && (<div className='text-red-500'>請選擇分類</div>)}
          {state.isAddingNewCategory && (
            <>
              <input
                type='text'
                value={state.newCategoryInput}
                onChange={handleNewCategoryInputChange}
                placeholder='輸入分類名稱'
                className='w-full'
              />
              <button
                className='border-2 border-transparent py-1 px-2 bg-sky-200'
                onClick={handleConfirmNewCategory}
              >
                確定
              </button>
            </>
          )}
        </div>
        <div className='item grow-1 flex flex-col justify-between gap-2'>
          <h1 className='text-xl'>狀態</h1>
          <span>
            {state.status === 'published' ? '已發佈' : '草稿'}
          </span>
          <div className='buttons flex justify-between my-5'>
            <div className='border-2 border-transparent py-1 underline cursor-pointer hover:no-underline' data-name='draft' onClick={handleSubmit}>儲存為草稿</div>
            <div className='border-2 border-transparent py-1 px-2 bg-sky-200 cursor-pointer rounded-full hover:bg-sky-500 hover:text-white' data-name='published' onClick={handleSubmit}>公開發佈</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Write
