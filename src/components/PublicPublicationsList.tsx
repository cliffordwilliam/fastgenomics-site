import { Publication } from "@prisma/client";
import PublicationCard from "./PublicationCard";

const PublicPublicationsList = ({
  publications,
}: {
  publications: Publication[];
}) => {
  const publishedPublications = publications.filter(
    (publication) => publication.isPublished
  );

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {publishedPublications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
        {publishedPublications.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-10">
            No publications found
          </div>
        )}
      </div>
    </>
  );
};

export default PublicPublicationsList;
