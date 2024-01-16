import Link from "next/link";
import React from "react";
import { BsHouse } from "react-icons/bs";

export default function Nav() {
  return (
    <div className="flex p-2">
      <Link href="/">
        <BsHouse className="text-2xl" />
      </Link>
    </div>
  );
}
