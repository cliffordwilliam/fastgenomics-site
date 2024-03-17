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
      <section className="bg-gradient-to-r from-cyan-50 to-cyan-300">
        <div className="p-4 container mx-auto">
          <h2 className="text-black font-bold text-4xl underline underline-offset-8 decoration-blue-700">
            Blogs
          </h2>
        </div>
      </section>
      <section>
        <div className="container mx-auto p-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id magnam
            quis sequi officiis nobis architecto incidunt in ducimus alias
            aliquam fugiat ullam porro esse libero, ad facere ex, sint iure!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id magnam
            quis sequi officiis nobis architecto incidunt in ducimus alias
            aliquam fugiat ullam porro esse libero, ad facere ex, sint iure!
          </p>
        </div>
      </section>
      <div className="container mx-auto p-4">
        <div className="md:hidden md:mb-0 mb-6 block">
          <BlogPublicSearchInput />
        </div>
        <PublicBlogsList blogs={blogs} />
      </div>
    </>
  );
};

export default Page;
