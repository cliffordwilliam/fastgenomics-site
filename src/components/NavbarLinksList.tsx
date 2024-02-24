"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import IsUserAdmin from "@/lib/IsUserAdmin";
import BlogPublicSearchInput from "./BlogPublicSearchInput";
import ServicePublicSearchInput from "./ServicePublicSearchInput";

const NavbarLinksList = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const onClick = () => {
    router.push(isAdmin ? "/" : "admin/blogs");
  };
  const isSearchBlogsPage = pathname === "/searchBlogs";
  const isSearchServicesPage = pathname === "/searchServices";
  return (
    <>
      {isSearchBlogsPage && (
        <div className="hidden md:block">
          <BlogPublicSearchInput />
        </div>
      )}
      {isSearchServicesPage && (
        <div className="hidden md:block">
          <ServicePublicSearchInput />
        </div>
      )}
      {IsUserAdmin(userId) && (
        <div className="ml-auto">
          {isAdmin && (
            <Button onClick={onClick} variant={"ghost"}>
              <User />
              <span>Regular mode</span>
            </Button>
          )}
          {!isAdmin && (
            <Button onClick={onClick} variant={"ghost"}>
              <Shield />
              <span className="ml-2">Admin mode</span>
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default NavbarLinksList;
