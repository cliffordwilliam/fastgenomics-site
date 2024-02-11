"use client";

import { UserButton } from "@clerk/nextjs";
import NavbarLinksList from "./NavbarLinksList";
import Burger from "./Burger";

const Navbar = () => {
  return (
    <>
      <nav className="flex items-center w-full border-b p-2">
        {/* burger */}
        <Burger />
        {/* mode button */}
        <NavbarLinksList />
        {/* user button */}
        <UserButton afterSignOutUrl="/" />
      </nav>
    </>
  );
};

export default Navbar;
