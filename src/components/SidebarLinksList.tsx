"use client";
import { Book, Cog, Home, LibraryBig, File, Info } from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarLinkItem from "./SidebarLinkItem";

const regularLinks = [
  { name: "Homepage", href: "/", Icon: Home },
  { name: "About", href: "/about", Icon: Info },
  { name: "Blogs", href: "/searchBlogs", Icon: LibraryBig },
  { name: "Services", href: "/searchServices", Icon: Cog },
  { name: "Publications", href: "/searchPublications", Icon: File },
];
const adminLinks = [
  { name: "Blogs", href: "/admin/blogs", Icon: Book },
  { name: "Services", href: "/admin/services", Icon: Cog },
  { name: "Publications", href: "/admin/publications", Icon: File },
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
