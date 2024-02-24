import ServiceContentPatchForm from "@/components/ServiceContentPatch";
import ServiceDeleteButton from "@/components/ServiceDeleteButton";
import ServiceImageUrlPatchForm from "@/components/ServiceImageUrlPatchForm";
import ServicePublishPatchButton from "@/components/ServicePublishPatchButton";
import ServiceTitlePatchForm from "@/components/ServiceTitlePatch";
import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { serviceId: string } }) => {
  const { userId } = await auth();
  if (!userId || !IsUserAdmin(userId)) {
    redirect("/sign-in");
  }
  const service = await db.service.findUnique({
    where: { id: params.serviceId },
  });
  if (!service) {
    redirect("/admin/services");
  }
  const requiredFields = [service.title, service.content, service.imageUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!service.isPublished && (
        <div className="border text-center p-4 text-sm flex items-center w-full bg-yellow-200/80 border-yellow-30 text-primary">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <span>
            This service is unpublished. It will not be visible to the public.
          </span>
        </div>
      )}
      <div className="p-6">
        <h1 className="text-2xl font-medium">Service setup</h1>
        <p className="text-sm text-slate-700">
          Complete all fields {completionText}
        </p>
        <div className="flex items-center gap-x-2 mt-2">
          <ServicePublishPatchButton
            service={service}
            isComplete={isComplete}
          />
          <ServiceDeleteButton service={service} />
        </div>
        <ServiceImageUrlPatchForm service={service} />
        <ServiceTitlePatchForm service={service} />
        <ServiceContentPatchForm service={service} />
      </div>
    </>
  );
};

export default Page;
