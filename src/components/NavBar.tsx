
import { Avatar, Navbar } from 'flowbite-react';




function NavBar() {
  return (
    <Navbar fluid style={{
      minHeight: "4rem",
    }} >

    <div className="flex items-center justify-end w-full">
      <div className="flex items-center gap-4">
          <Avatar size="md" img="images/student.png" rounded />
        <span className="">Admin</span>
      </div>
    </div>
    </Navbar>

  );
}

export default NavBar;
