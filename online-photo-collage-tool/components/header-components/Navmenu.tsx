import { navMenuItems } from "@/data/headerdata";
import Link from "next/link";
import React from "react";

const Navmenu = () => {
  return (
    <>
      {navMenuItems.map((navItem) => (
        <li key={navItem.url}>
          <Link className="navlink" href={navItem.url}>
            {navItem.title}
          </Link>
        </li>
      ))}
    </>
  );
};

export default Navmenu;
