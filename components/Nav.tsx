
import Link from "next/link";
import {  HomeIcon } from "lucide-react";


const Nav = () => {

  //console.log(session);
  return (
    <header className="bg-black text-white">
      <nav className="flex justify-between items-center w-full px-10 py-4">
      <Link href="/"><HomeIcon/></Link>
        <div className="flex gap-10">



          <Link href="/todo">PODJETNIK</Link>
          <Link href="/reducer/counter_reducer">CounterReducer</Link>
          <Link href="/reducer/slozeni_reducer">SlozeniReducer</Link>
          <Link href="/reducer/reducer_with_two_states">UdemiReducer</Link>
        </div>
      </nav>
    </header>
  );
};
export default Nav;
