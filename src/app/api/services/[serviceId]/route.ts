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
    const values = await req.json();
    const service = await db.service.update({
      where: { id: params.serviceId },
      data: { ...values },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.log("[SERVICE_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function DELETE(
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
    const deletedService = await db.service.delete({
      where: { id: params.serviceId },
    });
    return NextResponse.json(deletedService);
  } catch (error) {
    console.log("SERVICE_ID_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
