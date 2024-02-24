import { Service } from "@prisma/client";
import ServiceCard from "./ServiceCard";

const PublicServicesList = ({ services }: { services: Service[] }) => {
  const publishedServices = services.filter((service) => service.isPublished);

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {publishedServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
        {publishedServices.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-10">
            No services found
          </div>
        )}
      </div>
    </>
  );
};

export default PublicServicesList;
