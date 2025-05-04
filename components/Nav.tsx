
import Link from "next/link";
import {  HomeIcon } from "lucide-react";


const Nav = () => {

  //console.log(session);
  return (
    <>




<header className="bg-black text-white ">
  <nav className="flex justify-between items-center w-full max-w-7xl mx-auto p-4">

  <div className="flex gap-10 ml-0">
  <Link className=' p-0 ml-1'  href="/"><HomeIcon/></Link>
  </div>
    <div className="flex gap-10">
      <Link href="/todo">PODSJETNIK</Link>
    </div>
    {/* <ul> */}
      {/* <li><Link href="/reducer/counter_reducer">CounterReducer</Link></li>
      <li><Link href="/reducer/slozeni_reducer">SlozeniReducer</Link></li>
      <li><Link href="/reducer/reducer_with_two_states">UdemiReducer</Link></li>
      <li><Link href="/server-client/sever-client-components">ClientServer</Link></li>
      <li><Link href="/server-client/client-server-url/client">ClientServerUrl</Link></li>
      <li><Link href="/serever-action">CServerAction</Link></li> */}

    {/* </ul> */}

  </nav>
</header>
    </>
  );
};
export default Nav;
