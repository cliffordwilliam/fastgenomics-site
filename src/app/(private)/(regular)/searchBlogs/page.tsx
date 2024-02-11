import PublicBlogsList from "@/components/PublicBlogsList";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  // TODO: search params get here from a client search input
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const blogs = await db.blog.findMany({ orderBy: { title: "asc" } });
  return (
    <>
      <div className="p-6">
        <PublicBlogsList blogs={blogs} />
      </div>
    </>
  );
};

export default Page;
