import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-2.5">
        <div>logo</div>
        <div className="flex items-center gap-2.5">
          <Link to="/?cat=life">
            <h6 className="text-base font-light">Life</h6>
          </Link>
          <Link to="/?cat=coding">
            <h6 className="text-base font-light">Coding</h6>
          </Link>
          <span className="cursor-pointer">User Name</span>
          <span className="cursor-pointer">Logout</span>
          <span className="bg-sky-200 h-10 w-10 rounded-full font-light flex justify-center items-center hover:text-sky-700 hover:bg-transparent">
            <Link to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
