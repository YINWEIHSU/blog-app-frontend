import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const User = () => {
  const { currentUser, updateUser } = useContext(AuthContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    checkPassword: '',
    img: ''
  })
  const [editingUser, setEditingUser] = useState(user)

  useEffect(() => {
    setUser(currentUser)
    if (currentUser && id !== currentUser.id.toString()) {
      navigate('/')
    }
    setEditingUser(currentUser)
  }, [currentUser])

  const handleInputChange = (event) => {
    setEditingUser({
      ...editingUser,
      [event.target.name]: event.target.value
    })
  }

  const handleUpdateUser = async () => {
    try {
      await updateUser(editingUser)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className='user-profile'>
      {editingUser
        ? <div className='form'>
          <div className='flex'>
            <div className='image w-72'>
              <img src={editingUser.img} alt='User Avatar' />
            </div>
            <div className='info flex flex-col w-full gap-2'>
              <h1>顯示名稱</h1>
              <input className='p-2 rounded-lg border-2 border-slate-500' type='text' name='name' value={editingUser.name} onChange={handleInputChange} />
              <h1 className='mt-5'>信箱</h1>
              <input className='p-2 rounded-lg border-2 border-slate-300' type='email' name='email' value={editingUser.email} onChange={handleInputChange} disabled />
              <h1 className='mt-5'>更改密碼</h1>
              <input className='p-2 rounded-lg border-2 border-slate-500' type='password' name='newPassword' onChange={handleInputChange} placeholder='Change password' />
              <h1 className='mt-5'>確認更改密碼</h1>
              <input className='p-2 rounded-lg border-2 border-slate-500' type='password' name='checkPassword' onChange={handleInputChange} placeholder='Change password' />
            </div>
          </div>
          <div className='buttons flex justify-between mt-8'>
            <div className='border-2 border-transparent py-1 px-2 bg-rose-200 cursor-pointer rounded-full hover:bg-rose-500 hover:text-white' onClick={handleBack}>返回</div>
            <div className='border-2 border-transparent py-1 px-2 bg-sky-200 cursor-pointer rounded-full hover:bg-sky-500 hover:text-white' onClick={handleUpdateUser}>更新使用者資料</div>
          </div>
        </div>
        : <div>loading...</div>}
    </div>
  )
}

export default User
