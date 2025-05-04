

import Link from "next/link";
import React from "react";

const Home = () => {
  return <div className="flex flex-col   h-screen ml-2 text-blue-600 underline p-4">
    <Link href="/reducer/counter_reducer">CounterReducer</Link>
    <Link href="/reducer/slozeni_reducer">SlozeniReducer</Link>
    <Link href="/reducer/reducer_with_two_states">UdemiReducer</Link>

    <Link href="/server-client/sever-client-components">ClientServer</Link>
    <Link href="/server-client/client-server-url/client">ClientServerUrl</Link>
    <Link href="/serever-action">CServerAction</Link>





  </div>;
};
export default Home;
