import { Publication } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const PublicationCard = ({ publication }: { publication: Publication }) => {
  return (
    <>
      <Link href={`${publication.link}`}>
        <div className="group overflow-hidden border rounded-lg p-3 h-full">
          <div className="flex flex-col pt-2">
            <h2 className="text-lg md:text-base font-medium line-clamp-2">
              {publication.title}
            </h2>
            <p>{publication.author}</p>
            <p>{publication.year?.toDateString()}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PublicationCard;
