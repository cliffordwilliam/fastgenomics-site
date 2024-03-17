import PublicPublicationsList from "@/components/PublicPublicationsList";
import PublicationPublicSearchInput from "@/components/PublicationPublicSearchInput";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
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
      <div>
        <section className="bg-gradient-to-r from-cyan-50 to-cyan-300">
          <div className="p-4 container mx-auto">
            <h2 className="text-black font-bold text-4xl underline underline-offset-8 decoration-blue-700">
              Publications
            </h2>
          </div>
        </section>
        <div className="md:hidden md:mb-0 mb-6 block">
          <PublicationPublicSearchInput />
        </div>
        <PublicPublicationsList publications={publications} />
      </div>
      <section className="mt-auto">
        <div className="container mx-auto flex items-center justify-between min-h-48 p-4">
          <div>
            <Image
              width={360}
              height={360}
              alt="logo"
              src={"/logo.svg"}
              priority
              className="w-[360] h-[360]"
            />
            <p className="mt-4">We transform your data into discoveries</p>
          </div>
          <div>
            <p>Fastgenomics Solutions (M) SDN BHD</p>
            <p>Phone: +60 17-850 5024 (Azam) +60 11-6090 5857 (Zanul)</p>
            <p className="mt-4">Website: fastgenomicssolutions.com</p>
            <p>Gmail: fastgenom@gmail.com</p>
          </div>
        </div>
      </section>
      <section className="bg-zinc-700 p-4">
        <div className="container mx-auto">
          <p className="text-white">
            @ 2023 Fast Genomics Solutions. Powered by Jekyll and derivation of
            MM.
          </p>
        </div>
      </section>
    </>
  );
};

export default Page;
