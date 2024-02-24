import BlogPublicSearchInput from "@/components/BlogPublicSearchInput";
import PublicBlogsList from "@/components/PublicBlogsList";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ searchParams }: { searchParams: { title: string } }) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  let blogs = [];

  if (searchParams.title && searchParams.title.trim() !== "") {
    // got title? where
    blogs = await db.blog.findMany({
      orderBy: { title: "asc" },
      where: { title: { contains: searchParams.title } },
    });
  } else {
    // title empty? all
    blogs = await db.blog.findMany({
      orderBy: { title: "asc" },
    });
  }

  return (
    <>
      <div className="p-6">
        <div className="md:hidden md:mb-0 mb-6 block">
          <BlogPublicSearchInput />
        </div>
        <PublicBlogsList blogs={blogs} />
      </div>
    </>
  );
};

export default Page;
