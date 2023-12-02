import React, { useContext, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { UserContext } from '../page';


function Navbar() {
    const user = useContext(UserContext);
    console.log("user",user);
    const handleLogout=()=>{
      localStorage.removeItem("userInfo");
    }
  return (
    <div className="flex justify-between py-5 px-4 items-center">
      <h1 className="font-serif md:text-3xl text-lg font-bold">Comment System</h1>
      {!user ? (
        <Link href="/Login/">
          <button className="bg-red-400 text-white px-4 py-1 shadow-2xl">LogIn</button>
        </Link>
      ) : (
        <FiLogOut size={25} onClick={handleLogout} className="cursor-pointer"/>
      )}
     
    </div>
  );
}

export default Navbar;
