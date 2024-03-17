import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { searchBlogId: string } }) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const blog = await db.blog.findUnique({ where: { id: params.searchBlogId } });
  if (!blog) {
    redirect("/admin/blogs");
  }
  return (
    <>
      <section className="bg-gradient-to-r from-cyan-50 to-cyan-300">
        <div className="p-4 container mx-auto">
          <h2 className="text-black font-bold text-4xl underline underline-offset-8 decoration-blue-700">
            {blog.title}
          </h2>
          <p className="mt-2">
            Date published: {blog.createdAt.toDateString()}
          </p>
        </div>
      </section>
      <div className="p-4 container mx-auto prose">
        <Image
          width={300}
          height={300}
          alt={blog.title}
          src={blog.imageUrl || ""}
        />
        <h1>{blog.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
      </div>
    </>
  );
};

export default Page;
