import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId || !IsUserAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const blog = await db.blog.findUnique({ where: { id: params.blogId } });
    if (!blog) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (!blog.title || !blog.content || !blog.imageUrl) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    const unpublishedBlog = await db.blog.update({
      where: { id: params.blogId },
      data: { isPublished: false },
    });
    return NextResponse.json(unpublishedBlog);
  } catch (error) {
    console.log("[BLOG_ID_UNPUBLISH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
