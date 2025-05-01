
import Link from "next/link";
import {  HomeIcon } from "lucide-react";


const Nav = () => {

  //console.log(session);
  return (
    <header className="bg-black text-white ">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto p-4">

      <div className="flex gap-10 ml-0">
      <Link className=' p-0 ml-1'  href="/"><HomeIcon/></Link>
      </div>
        <div className="flex gap-10">
          <Link href="/todo">PODSJETNIK</Link>
        </div>

      </nav>
    </header>
  );
};
export default Nav;
