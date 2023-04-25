import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const posts = [{
    id: 1,
    title: "Post 1",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "https://dummyimage.com/1920x1080/9bd1c8/dcdce0"
  },
  {
    id: 2,
    title: "Post 2",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "https://dummyimage.com/1920x1080/9bd1c8/dcdce0"
  },
   {
      id: 3,
      title: "Post 3",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      image: "https://dummyimage.com/1920x1080/9bd1c8/dcdce0"
    }]
  return (
    <div>
      <div className="mt-12 flex flex-col gap-40">
        {posts.map(post => (
          <div className="flex gap-20" key={post.id}>
            <div className="grow-2">
              <img className="w-full max-h-96 object-cover" src={post.image} alt="" />
            </div>
            <div className="grow-3 flex flex-col justify-between">
              <Link to={`/post/${post.id}`}>
                <h1 className="text-5xl">{post.title}</h1>
              </Link>
              <p className="text-xl">{post.desc}</p>
              <button className="w-max py-2.5 text-gray-400 hover:text-black">Read more...</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home