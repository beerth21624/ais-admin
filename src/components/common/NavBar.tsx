import {useState,useEffect} from 'react';
import { Avatar, Navbar } from 'flowbite-react';




function NavBar() {
  const [user, setUser] = useState<{name:string}>({name:''});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(user);
  }, []);

  return (
    <Navbar fluid style={{
      minHeight: "4rem",
    }} >

    <div className="flex items-center justify-end w-full">
      <div className="flex items-center gap-2 pr-2">
          <Avatar size="md" img="images/profile.png" rounded />
          <span className="">{user.name || ''}</span>
      </div>
    </div>
    </Navbar>

  );
}

export default NavBar;
