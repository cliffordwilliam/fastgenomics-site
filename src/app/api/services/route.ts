import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId || !IsUserAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const values = await req.json();
    const service = await db.service.create({ data: { title: values.title } });
    return NextResponse.json(service);
  } catch (error) {
    console.log("[SERVICES]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
