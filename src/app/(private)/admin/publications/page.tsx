import { DataTable } from "@/components/DataTable";
import { PublicationsColumns } from "@/components/PublicationColumns";
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
  const publications = await db.publication.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <div className="p-6">
        <Link href={"/admin/createPublication"}>
          <Button>Add publication</Button>
        </Link>
        <DataTable columns={PublicationsColumns} data={publications} />
      </div>
    </>
  );
};

export default Page;
