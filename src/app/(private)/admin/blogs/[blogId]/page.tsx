import BlogContentPatchForm from "@/components/BlogContentPatchForm";
import BlogTitlePatchForm from "@/components/BlogTitlePatch";
import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { blogId: string } }) => {
  const { userId } = await auth();
  if (!userId || !IsUserAdmin(userId)) {
    redirect("/sign-in");
  }
  const blog = await db.blog.findUnique({ where: { id: params.blogId } });
  if (!blog) {
    redirect("/admin/blogs");
  }
  return (
    <>
      <BlogTitlePatchForm blog={blog} />
      <BlogContentPatchForm blog={blog} />
    </>
  );
};

export default Page;
