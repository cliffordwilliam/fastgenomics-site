import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { searchBlogId: string } }) => {
  const { userId } = await auth();
  if (!userId || !IsUserAdmin(userId)) {
    redirect("/sign-in");
  }
  const blog = await db.blog.findUnique({ where: { id: params.searchBlogId } });
  if (!blog) {
    redirect("/admin/blogs");
  }
  return (
    <>
      <div className="p-6 prose">
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
