"use client";

import { Service } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

const ServiceDeleteButton = ({ service }: { service: Service }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/services/${service.id}`);
      toast.success("Service successfully deleted.");
      router.refresh();
      router.push("/admin/services");
    } catch (error) {
      toast.error("Failed to delete service.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button onClick={onDelete} disabled={isLoading} size={"sm"}>
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
};

export default ServiceDeleteButton;
