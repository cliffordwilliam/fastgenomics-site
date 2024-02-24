"use client";

import { Service } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const ServicePublishPatchButton = ({
  service,
  isComplete,
}: {
  service: Service;
  isComplete: boolean;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onPublish = async () => {
    try {
      setIsLoading(true);
      if (service.isPublished) {
        await axios.patch(`/api/services/${service.id}/unpublish`);
        toast.success("Service successfully unpublished.");
      } else {
        await axios.patch(`/api/services/${service.id}/publish`);
        toast.success("Service successfully published.");
      }
      router.refresh();
    } catch (error) {
      toast.error("Failed to update service published state.");
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
        {service.isPublished ? "Unpublish" : "Publish"}
      </Button>
    </>
  );
};

export default ServicePublishPatchButton;
