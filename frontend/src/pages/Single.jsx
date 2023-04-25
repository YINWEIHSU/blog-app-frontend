import React from "react"
import { Link } from "react-router-dom"
import Menu from "../components/Menu"

const Single = () => {
  return (
    <div className="flex gap-12">
      <div className="grow-5 flex flex-col gap-7 max-w-2xl">
        <img className="h-80 w-full object-cover" src="https://dummyimage.com/1920x1080/9bd1c8/dcdce0" alt="" />
        <div className="flex items-center gap-2.5 text-sm">
          <img className="w-12 h-12 rounded-full object-cover" src="https://dummyimage.com/1920x1080/9bd1c8/dcdce0" alt="" />
          <div>
            <span className="font-bold">User</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="flex gap-1.5">
            <Link to="/write?edit=123">
              <div>Edit</div>
            </Link>
            <div>Delete</div>
          </div>
        </div>
        <h1 className="text-4xl">Lorem ipsum dolor sit amet consectetur adipiscing</h1>
        <p className="text-justify leading-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Sem fringilla ut morbi tincidunt augue interdum. Enim neque volutpat ac tincidunt vitae. Tincidunt augue interdum velit euismod in pellentesque. Lectus urna duis convallis convallis tellus id interdum velit. In fermentum posuere urna nec tincidunt praesent semper. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Pellentesque adipiscing commodo elit at imperdiet dui. Porta lorem mollis aliquam ut porttitor leo a diam. Egestas purus viverra accumsan in. Eu augue ut lectus arcu. Morbi leo urna molestie at elementum eu facilisis.
          <br /><br />
          Eget nunc lobortis mattis aliquam faucibus purus in. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Elementum eu facilisis sed odio morbi. Enim lobortis scelerisque fermentum dui faucibus in. Vitae et leo duis ut. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Libero nunc consequat interdum varius sit amet mattis vulputate. Malesuada proin libero nunc consequat interdum varius sit. Est pellentesque elit ullamcorper dignissim. Sed tempus urna et pharetra pharetra massa. Elementum facilisis leo vel fringilla est ullamcorper eget. Sit amet aliquam id diam maecenas. Morbi quis commodo odio aenean sed adipiscing diam.
          <br /><br />
          Etiam tempor orci eu lobortis. Imperdiet nulla malesuada pellentesque elit eget. Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Elit at imperdiet dui accumsan sit amet nulla facilisi. Eu facilisis sed odio morbi quis commodo. Nunc consequat interdum varius sit amet mattis. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Dolor sit amet consectetur adipiscing elit ut aliquam purus sit. Diam sit amet nisl suscipit adipiscing bibendum est. Sed viverra ipsum nunc aliquet bibendum enim facilisis. Dictum sit amet justo donec enim. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Ac placerat vestibulum lectus mauris ultrices. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Quis auctor elit sed vulputate mi sit amet mauris. Amet purus gravida quis blandit turpis cursus in hac. Vitae turpis massa sed elementum.</p>
      </div>
      <Menu></Menu>
    </div>
    )
}

export default Single