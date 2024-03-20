import PublicBlogsList from "@/components/PublicBlogsList";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  let blogs = [];
  blogs = await db.blog.findMany({
    orderBy: { title: "asc" },
  });
  if (blogs.length >= 2) {
    blogs = blogs.slice(0, 2);
  }
  return (
    <>
      {/* Hero */}
      <section>
        <div className="p-4 min-h-96 flex justify-between items-center gap-4 container mx-auto">
          <div>
            <span className="mb-4 tracking-widest">Welcome to</span>
            <Image
              width={360}
              height={360}
              alt="logo"
              src={"/logo.svg"}
              priority
              className="w-[360] h-[360]"
            />
            <p className="mt-4">
              Helping you analyze and process microbial genomic data. We help
              you turn data into discoveries.
            </p>
            <Button className="mt-4 rounded-full">Get in touch</Button>
          </div>
          <Image
            width={360}
            height={360}
            alt="circle"
            src={"/circle.svg"}
            priority
            className="w-[360] h-[360]"
          />
        </div>
      </section>
      {/* We are */}
      <section className="bg-gradient-to-r from-cyan-50 to-cyan-300">
        <div className="p-4 min-h-96 flex justify-between items-center gap-4 container mx-auto">
          <div>
            <h2>
              <span className="text-blue-700 text-4xl">
                We are a bioinformatics
              </span>
              <br />
              <span className="text-blue-700 text-4xl font-bold">
                consulting company,
              </span>
            </h2>
            <p className="mt-4">
              Working closely with our client to analyze sequencing data of
              microbial genomes, ensuring client&aposs thorough comprehension on
              their data whether for research or other purposes through data
              visualization and storytelling. We provice publication-quality
              data visualizations
            </p>
          </div>
          <Image
            width={360}
            height={360}
            alt="line_art"
            src={"/line_art.svg"}
            priority
            className="w-[360] h-[360]"
          />
        </div>
      </section>
      {/* Our */}
      <section>
        <div className="p-4 flex justify-between items-center gap-4 flex-wrap container mx-auto">
          <h2 className="text-2xl basis-full text-center mb-4">
            Our service includes, but not limited to:
          </h2>
          <div className="flex-1">
            <p>Some examples:</p>
            <ul className="list-disc">
              <li>16S rRNA gene sequencing</li>
              <li>Shotgun metagenomics</li>
              <li>Microbial pangenomics and phylogenomics</li>
            </ul>
            <p>Simply tell us what you need and we will see what we can do!</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 flex-1">
            <Image
              width={360}
              height={360}
              alt="s1"
              src={"/s1.webp"}
              priority
              className="w-[360] h-[360]"
            />
            <p className="text-xl">Bioinformatics service and consultation</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 flex-1">
            <Image
              width={360}
              height={360}
              alt="s2"
              src={"/s2.webp"}
              priority
              className="w-[360] h-[360]"
            />
            <p className="text-xl">Bioinformatics service and consultation</p>
          </div>
          <p className="flex-1">
            We provide bioinformatics workshops for institutions and coding
            classes. Contact us if you would like to know more.
          </p>
        </div>
      </section>
      <section className="bg-gradient-to-r from-sky-600 to-teal-600 p-4 min-h-24 flex items-center justify-center">
        <p className="text-center text-2xl text-white container mx-auto">
          Partners with 8 universities around Malaysia in providing
          bioinformatics services and workshops
        </p>
      </section>
      <section>
        <div className="flex flex-wrap container mx-auto">
          <Image
            width={360}
            height={360}
            alt="1"
            src={"/1.png"}
            priority
            className="w-[360] h-[360]"
          />
          <Image
            width={360}
            height={360}
            alt="2"
            src={"/2.png"}
            priority
            className="w-[360] h-[360]"
          />
          <Image
            width={360}
            height={360}
            alt="3"
            src={"/3.png"}
            priority
            className="w-[360] h-[360]"
          />
          <Image
            width={360}
            height={360}
            alt="4"
            src={"/4.png"}
            priority
            className="w-[360] h-[360]"
          />
          <Image
            width={360}
            height={360}
            alt="5"
            src={"/5.png"}
            priority
            className="w-[360] h-[360]"
          />
          <Image
            width={360}
            height={360}
            alt="6"
            src={"/6.png"}
            priority
            className="w-[360] h-[360]"
          />
        </div>
      </section>
      <section>
        <h2 className="underline underline-offset-8 text-center text-3xl decoration-sky-300">
          Our recent blog
        </h2>
        <div className="p-6 container mx-auto">
          <PublicBlogsList blogs={blogs} />
        </div>
      </section>
      <section className="bg-gradient-to-r from-yellow-500 to-transparent p-4 min-h-24">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">
              In need for Bioinformatics service?
            </p>
            <p className="text-lg italic">Tal to our team today!</p>
          </div>
          <Button className="mt-4 rounded-full">Get in touch</Button>
        </div>
      </section>
      <section>
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
