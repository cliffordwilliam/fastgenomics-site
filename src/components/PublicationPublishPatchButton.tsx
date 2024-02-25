"use client";

import { Publication } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const PublicationPublishPatchButton = ({
  publication,
  isComplete,
}: {
  publication: Publication;
  isComplete: boolean;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onPublish = async () => {
    try {
      setIsLoading(true);
      if (publication.isPublished) {
        await axios.patch(`/api/publications/${publication.id}/unpublish`);
        toast.success("Publication successfully unpublished.");
      } else {
        await axios.patch(`/api/publications/${publication.id}/publish`);
        toast.success("Publication successfully published.");
      }
      router.refresh();
    } catch (error) {
      toast.error("Failed to update publication published state.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        onClick={onPublish}
        disabled={isLoading || !isComplete}
        variant={"outline"}
        size={"sm"}
      >
        {publication.isPublished ? "Unpublish" : "Publish"}
      </Button>
    </>
  );
};

export default PublicationPublishPatchButton;
