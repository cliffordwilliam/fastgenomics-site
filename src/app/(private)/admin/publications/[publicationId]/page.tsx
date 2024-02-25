import PublicationAuthorPatch from "@/components/PublicationAuthorPatch";
import PublicationDatePatch from "@/components/PublicationDatePatchForm";
import PublicationDeleteButton from "@/components/PublicationDeleteButton";
import PublicationLinkPatchForm from "@/components/PublicationLinkPatchForm";
import PublicationPublishPatchButton from "@/components/PublicationPublishPatchButton";
import PublicationTitlePatchForm from "@/components/PublicationTitlePatch";
import IsUserAdmin from "@/lib/IsUserAdmin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { publicationId: string } }) => {
  const { userId } = await auth();
  if (!userId || !IsUserAdmin(userId)) {
    redirect("/sign-in");
  }
  const publication = await db.publication.findUnique({
    where: { id: params.publicationId },
  });
  if (!publication) {
    redirect("/admin/publications");
  }
  const requiredFields = [
    publication.title,
    publication.author,
    publication.year,
    publication.link,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!publication.isPublished && (
        <div className="border text-center p-4 text-sm flex items-center w-full bg-yellow-200/80 border-yellow-30 text-primary">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <span>
            This publication is unpublished. It will not be visible to the
            public.
          </span>
        </div>
      )}
      <div className="p-6">
        <h1 className="text-2xl font-medium">Publication setup</h1>
        <p className="text-sm text-slate-700">
          Complete all fields {completionText}
        </p>
        <div className="flex items-center gap-x-2 mt-2">
          <PublicationPublishPatchButton
            publication={publication}
            isComplete={isComplete}
          />
          <PublicationDeleteButton publication={publication} />
        </div>
        <PublicationTitlePatchForm publication={publication} />
        <PublicationAuthorPatch publication={publication} />
        <PublicationLinkPatchForm publication={publication} />
        <PublicationDatePatch publication={publication} />
      </div>
    </>
  );
};

export default Page;
