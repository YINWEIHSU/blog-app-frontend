import React, {useReducer, useEffect, useRef} from "react"
import MDEditor from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"

const CONTENT_ON_CHANGE = 'content-on-change'
const reducer = (state, action) => {
  switch (action.type) {
    case CONTENT_ON_CHANGE:
      const content = action.payload
      const startIndex = content.indexOf('# ') > -1 ? content.indexOf('# ') + 1 : -1
      const endIndex = content.indexOf('\n', startIndex) > -1 ? content.indexOf('\n', startIndex) : content.length
      const title = startIndex > -1 ? content.substring(startIndex, endIndex) : 'New Article'
      return {...state, title, content}
    default:
      return state
  }
}

const Write = () => {
  const [state, dispatch] = useReducer(reducer, {title: 'New Article', content: '# New Article'})
  const textareaRef = useRef(null)
  const handleChange = (event) => { 
    dispatch({ type: CONTENT_ON_CHANGE, payload: event})
  }
  useEffect(() => {
    // dynamically resize textarea
    const textarea = textareaRef.current
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
    const paddingTop = parseInt(getComputedStyle(textarea).paddingTop)
    const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom)
    const border = parseInt(getComputedStyle(textarea).borderWidth)
    const height = textarea.scrollHeight - paddingTop - paddingBottom + border
    const rows = Math.ceil(height / lineHeight);
    textarea.rows = rows 
    return () => {
      // reset rows when the content is cleared
      textarea.rows = 1
    }
  }, [state.title])

  return (
    <div className="mt-5 flex gap-5">
      <div className="content grow-5 flex flex-col gap-5">
        <textarea 
        ref={textareaRef}
          className="w-full whitespace-wrap break-words resize-none text-3xl outline-0" 
          placeholder="New Title" 
          value={state.title} 
          readOnly />
        <div data-color-mode="light">
          <MDEditor
            value={state.content}
            onChange={handleChange}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
      </div>
      <div className="menu grow-2 flex flex-col gap-5">
        <div className="item grow-1 flex flex-col justify-between">
          <h1 className="text-2xl">Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <div className="buttons flex justify-between">
            <button className="border-2 border-transparent py-1 px-2 bg-sky-200">Save as a draft</button>
            <button className="border-2 border-transparent py-1 px-2 bg-sky-200">Update</button>
          </div>
        </div>
        <div className="item grow-1 flex flex-col justify-between">
          <h1 className="text-2xl">Categories</h1>
          <div className="flex items-center gap-1">
            <input type="checkbox" name="life" id="life" />
            <label htmlFor="life">Life</label>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" name="coding" id="coding" />
            <label htmlFor="tech">Coding</label>
          </div>
        </div>
      </div>

    </div>)
}

export default Write