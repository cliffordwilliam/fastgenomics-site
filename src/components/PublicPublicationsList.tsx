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

  let prevYear: number | undefined = undefined;

  return (
    <>
      <div className="flex flex-col gap-4 p-4 container mx-auto">
        {publishedPublications.map((publication) => {
          const currentYear = publication.year?.getFullYear();

          // Render <h2> only if the year changes
          const renderYear = currentYear !== prevYear;
          prevYear = currentYear; // Update previous year for next iteration

          return (
            <>
              {renderYear && (
                <>
                  <div>
                    <h2 className="font-bold	text-2xl">{currentYear}</h2>
                    <hr className="h-1 bg-sky-400 border-0 rounded" />
                  </div>
                </>
              )}
              <PublicationCard key={publication.id} publication={publication} />
            </>
          );
        })}
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
