import { navMenuItems } from "@/data/headerdata";
import Link from "next/link";
import React from "react";

const Navmenu = () => {
  return (
    <>
      {navMenuItems.map((navItem) => (
        <li key={navItem.url}>
          <Link className=" hover:underline underline-offset-8  decoration-yellow-700" href={navItem.url}>
            {navItem.title}
          </Link>
        </li>
      ))}
    </>
  );
};

export default Navmenu;
