import PublicPublicationsList from "@/components/PublicPublicationsList";
import PublicationPublicSearchInput from "@/components/PublicationPublicSearchInput";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ searchParams }: { searchParams: { title: string } }) => {
  // TODO: search params get here from a client search input
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  let publications = [];

  if (searchParams.title && searchParams.title.trim() !== "") {
    // got title? where
    publications = await db.publication.findMany({
      orderBy: { title: "asc" },
      where: { title: { contains: searchParams.title } },
    });
  } else {
    // title empty? all
    publications = await db.publication.findMany({
      orderBy: { title: "asc" },
    });
  }
  return (
    <>
      <div className="p-6">
        <div className="md:hidden md:mb-0 mb-6 block">
          <PublicationPublicSearchInput />
        </div>
        <PublicPublicationsList publications={publications} />
      </div>
    </>
  );
};

export default Page;
