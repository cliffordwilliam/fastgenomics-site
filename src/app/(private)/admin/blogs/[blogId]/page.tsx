import BlogContentPatchForm from "@/components/BlogContentPatchForm";
import BlogDeleteButton from "@/components/BlogDeleteButton";
import BlogImageUrlPatchForm from "@/components/BlogImageUrlPatchForm";
import BlogPublishPatchButton from "@/components/BlogPublishPatchButton";
import BlogTitlePatchForm from "@/components/BlogTitlePatch";
import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";
import { boolean } from "zod";

const Page = async ({ params }: { params: { blogId: string } }) => {
  const { userId } = await auth();
  if (!userId || !IsUserAdmin(userId)) {
    redirect("/sign-in");
  }
  const blog = await db.blog.findUnique({ where: { id: params.blogId } });
  if (!blog) {
    redirect("/admin/blogs");
  }
  const requiredFields = [blog.title, blog.content, blog.imageUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!blog.isPublished && (
        <div className="border text-center p-4 text-sm flex items-center w-full bg-yellow-200/80 border-yellow-30 text-primary">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <span>
            This blog is unpublished. It will not be visible to the public.
          </span>
        </div>
      )}
      <div className="p-6">
        <h1 className="text-2xl font-medium">Blog setup</h1>
        <p className="text-sm text-slate-700">
          Complete all fields {completionText}
        </p>
        <div className="flex items-center gap-x-2 mt-2">
          <BlogPublishPatchButton blog={blog} isComplete={isComplete} />
          <BlogDeleteButton blog={blog} />
        </div>
        <BlogImageUrlPatchForm blog={blog} />
        <BlogTitlePatchForm blog={blog} />
        <BlogContentPatchForm blog={blog} />
      </div>
    </>
  );
};

export default Page;
