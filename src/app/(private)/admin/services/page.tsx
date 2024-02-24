import { DataTable } from "@/components/DataTable";
import { ServicesColumns } from "@/components/ServiceColumns";
import { Button } from "@/components/ui/button";
import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = await auth();
  if (!userId || !IsUserAdmin(userId)) {
    redirect("/sign-in");
  }
  const services = await db.service.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <div className="p-6">
        <Link href={"/admin/createService"}>
          <Button>Add service</Button>
        </Link>
        <DataTable columns={ServicesColumns} data={services}></DataTable>
      </div>
    </>
  );
};

export default Page;
