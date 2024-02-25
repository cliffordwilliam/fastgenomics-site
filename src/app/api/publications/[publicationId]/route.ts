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
    const values = await req.json();
    const publication = await db.publication.update({
      where: { id: params.publicationId },
      data: { ...values },
    });
    return NextResponse.json(publication);
  } catch (error) {
    console.log("[PUBLICATION_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function DELETE(
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
    const deletedPublication = await db.publication.delete({
      where: { id: params.publicationId },
    });
    return NextResponse.json(deletedPublication);
  } catch (error) {
    console.log("PUBLICATION_ID_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
