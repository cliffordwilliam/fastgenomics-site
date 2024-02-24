import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId || !IsUserAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const service = await db.service.findUnique({
      where: { id: params.serviceId },
    });
    if (!service) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (!service.title || !service.content || !service.imageUrl) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    const publishedService = await db.service.update({
      where: { id: params.serviceId },
      data: { isPublished: false },
    });
    return NextResponse.json(publishedService);
  } catch (error) {
    console.log("[SERVICE_ID_PUBLISH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
