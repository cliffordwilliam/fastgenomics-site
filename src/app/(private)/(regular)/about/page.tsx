import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-cyan-50 to-cyan-300">
        <div className="p-4 container mx-auto">
          <h2 className="text-black font-bold text-4xl underline underline-offset-8 decoration-blue-700">
            About us
          </h2>
        </div>
      </section>
      <section>
        <div className="container mx-auto flex items-center justify-between p-4">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id magnam
              quis sequi officiis nobis architecto incidunt in ducimus alias
              aliquam fugiat ullam porro esse libero, ad facere ex, sint iure!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id magnam
              quis sequi officiis nobis architecto incidunt in ducimus alias
              aliquam fugiat ullam porro esse libero, ad facere ex, sint iure!
            </p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id magnam
              quis sequi officiis nobis architecto incidunt in ducimus alias
              aliquam fugiat ullam porro esse libero, ad facere ex, sint iure!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id magnam
              quis sequi officiis nobis architecto incidunt in ducimus alias
              aliquam fugiat ullam porro esse libero, ad facere ex, sint iure!
            </p>
          </div>
          <div className="flex flex-col">
            <Image
              width={800}
              height={800}
              alt="three"
              src={"/three.png"}
              priority
              className="w-[800] h-[800]"
            />
            <div className="p-4">
              <p>Comprising of scientists from different background,</p>
            </div>
            <div className="p-4 bg-blue-200">
              <p>Fastgenomics has expertise from the field to the lab.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-cyan-50 to-cyan-300">
        <div className="p-4 container mx-auto">
          <h2 className="text-blue-700 text-4xl underline underline-offset-8 decoration-blue-700">
            Our Mission
          </h2>
          <p className="mt-4 mb-8">
            Our mission is to provide biological informatics support addressing
            academics needs and to provide industrial solutions in Malaysia. The
            services we provide includes, but not limited to, bioinformatics
            service and consultation as well as hands-on training.
          </p>
          <h2 className="text-blue-700 text-4xl underline underline-offset-8 decoration-blue-700">
            Our Vision
          </h2>
          <ul className="mt-4 list-disc">
            <li>
              To promote biological research using genomics technology as well
              as cutting-edge technology.
            </li>
            <li>
              To enable more science communication between academia and industry
              leaders, to recognise applications of a new technology to overcome
              current barriers in research and industry.
            </li>
            <li>
              To provide genome expertise for national preparedness for the enxt
              pandemic surveillance using genomics.
            </li>
            <li>
              To be a cneter of excellence in biological research by training
              next-generation scientists and promoting creative solutions for
              future problems.
            </li>
            <li>
              To apply creative, engaging data visualisations to attract more
              people to learn science.
            </li>
            <li>
              To be a forefront of applying automation for high-throughput
              research.
            </li>
          </ul>
          <p className="text-xl mt-8">
            Level up your research by reaching out to us today!
          </p>
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
