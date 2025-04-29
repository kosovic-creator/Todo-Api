
import Nav from "@/components/Nav";
import { Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Home = () => {
  return <div>
    <Link href="/reducer/counter_reducer">CounterReducer</Link>
    <Link href="/reducer/slozeni_reducer">SlozeniReducer</Link>
    <Link href="/reducer/reducer_with_two_states">UdemiReducer</Link>

  </div>;
};
export default Home;
