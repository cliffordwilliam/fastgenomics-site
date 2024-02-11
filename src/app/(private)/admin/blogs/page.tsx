import { BlogsColumns } from "@/components/BlogColumns";
import { DataTable } from "@/components/DataTable";
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
  const blogs = await db.blog.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <div className="p-6">
        <Link href={"/admin/createBlog"}>
          <Button>Add blog</Button>
        </Link>
        <DataTable columns={BlogsColumns} data={blogs} />
      </div>
    </>
  );
};

export default Page;
