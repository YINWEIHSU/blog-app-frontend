import React, { useReducer, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const CONTENT_ON_CHANGE = 'content-on-change'
const CATEGORY_ON_CHANGE = 'category-on-change'
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
  return { ...state, category: payload, errorMessage: '' }
}

const reducer = (state, action) => {
  switch (action.type) {
    case CONTENT_ON_CHANGE:
      return getContentOnChangeState(state, action.payload)
    case CATEGORY_ON_CHANGE:
      return getCategoryOnChangeState(state, action.payload)
    default:
      return state
  }
}

const Write = () => {
  const existsArticle = useLocation().state
  const [state, dispatch] = useReducer(reducer, { id: existsArticle?.id, title: existsArticle?.title || 'New Article', content: existsArticle?.content || '# New Article', category: existsArticle?.category || 'Life', status: existsArticle?.status || 'draft', errorMessage: '' })
  const navigate = useNavigate()
  const textareaRef = useRef(null)
  const handleChange = (event) => {
    dispatch({ type: CONTENT_ON_CHANGE, payload: event })
  }
  const handleCheckboxChange = (e) => {
    dispatch({ type: CATEGORY_ON_CHANGE, payload: e.target.value })
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
    try {
      const response = existsArticle
        ? await axios.put(`/posts/${state.id}`, { ...state, status: e.target.name })
        : await axios.post('/posts', { ...state, status: e.target.name })
      navigate(`/post/${response.data.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='mt-5 flex gap-5'>
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
          />
        </div>
      </div>
      <div className='menu grow-2 flex flex-col gap-5'>
        <div className='item grow-1 flex flex-col justify-between'>
          <h1 className='text-2xl'>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <div className='buttons flex justify-between'>
            <button className='border-2 border-transparent py-1 px-2 bg-sky-200' name='draft' onClick={handleSubmit}>Save as a draft</button>
            <button className='border-2 border-transparent py-1 px-2 bg-sky-200' name='published' onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className='item grow-1 flex flex-col justify-between'>
          <h1 className='text-2xl'>Categories</h1>
          <div className='flex items-center gap-1'>
            <input type='radio' checked={state.category === 'life'} name='category' id='life' value='life' onChange={handleCheckboxChange} />
            <label htmlFor='life'>Life</label>
          </div>
          <div className='flex items-center gap-1'>
            <input type='radio' checked={state.category === 'learning'} name='category' id='learning' value='learning' onChange={handleCheckboxChange} />
            <label htmlFor='learning'>Learning</label>
          </div>
          <div className='flex items-center gap-1'>
            <input type='radio' checked={state.category === 'work'} name='category' id='work' value='work' onChange={handleCheckboxChange} />
            <label htmlFor='work'>Work</label>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Write
