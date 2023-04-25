import React from "react";

const Menu = () => {
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
    id: 2,
    title: "Post 3",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "https://dummyimage.com/1920x1080/9bd1c8/dcdce0"
  }]
  return (
    <div className="menu grow-2 flex flex-col gap-6">
      <h1>Other posts</h1>
      {posts.map(post => (
        <div className="post flex flex-col gap-2.5" key={post.id}>
          <img className="h-48 w-full object-cover"src={post.image} alt="" />
          <h2 className="text-3xl text-gray-700">{post.title}</h2>
          <button className="w-max py-2.5 text-gray-400 hover:text-black">Read more...</button>
        </div>
      ))}
    </div>
  )
}

export default Menu