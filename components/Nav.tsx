
import Link from "next/link";
import {  HomeIcon } from "lucide-react";


const Nav = () => {

  //console.log(session);
  return (
    <header className="bg-black text-white flex-shrink-0">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto p-4">
      <Link href="/"><HomeIcon/></Link>
        <div className="flex gap-10">



          <Link href="/todo">PODJETNIK</Link>

        </div>
      </nav>
    </header>
  );
};
export default Nav;
