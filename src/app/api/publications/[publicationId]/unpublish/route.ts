import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { publicationId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId || !IsUserAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const publication = await db.publication.findUnique({
      where: { id: params.publicationId },
    });
    if (!publication) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (
      !publication.title ||
      !publication.author ||
      !publication.link ||
      !publication.year
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    const publishedPublication = await db.publication.update({
      where: { id: params.publicationId },
      data: { isPublished: false },
    });
    return NextResponse.json(publishedPublication);
  } catch (error) {
    console.log("[PUBLICATION_ID_PUBLISH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
