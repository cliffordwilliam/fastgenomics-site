import { Publication } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const PublicationCard = ({ publication }: { publication: Publication }) => {
  return (
    <>
      <Link href={`${publication.link}`}>
        <div className="group overflow-hidden border-l-8 border-zinc-200 p-3 h-full">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold md:text-base line-clamp-2">
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
