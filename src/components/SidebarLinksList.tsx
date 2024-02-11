"use client";
import { Book, Cog, Compass, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarLinkItem from "./SidebarLinkItem";

const regularLinks = [
  { name: "Homepage", href: "/", Icon: Home },
  { name: "Search", href: "/search", Icon: Compass },
];
const adminLinks = [
  { name: "Blogs", href: "/admin/blogs", Icon: Book },
  { name: "Services", href: "/admin/services", Icon: Cog },
];
const SidebarLinksList = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const links = isAdmin ? adminLinks : regularLinks;
  return (
    <>
      <div className="flex flex-col">
        {links.map((link) => (
          <SidebarLinkItem
            key={link.name}
            name={link.name}
            href={link.href}
            Icon={link.Icon}
          />
        ))}
      </div>
    </>
  );
};

export default SidebarLinksList;
