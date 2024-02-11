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
    const values = await req.json();
    const blog = await db.blog.update({
      where: { id: params.blogId },
      data: { ...values },
    });
    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BLOG_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
