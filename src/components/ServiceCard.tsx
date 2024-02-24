import { Service } from "@prisma/client";
import Image from "next/image";
// import Link from "next/link";

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <>
      {/* <Link href={`searchServices/${service.id}`}> */}
      <div className="group overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={service.title}
            src={service.imageUrl || ""}
          />
        </div>
        <div className="flex flex-col pt-2">
          <h2 className="text-lg md:text-base font-medium line-clamp-2">
            {service.title}
          </h2>
          <p>{service.content}</p>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
};

export default ServiceCard;
