"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Service } from "@prisma/client";
import axios from "axios";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import FileUpload from "./FileUpload";

const formSchema = z.object({
  imageUrl: z.string().min(2, {
    message: "Image url must be at least 2 characters.",
  }),
});

const ServiceImageUrlPatchForm = ({ service }: { service: Service }) => {
  const route = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      imageUrl: service.imageUrl || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.patch(`/api/services/${service.id}`, values);
      toast.success("Service imageUrl successfully updated.");
      route.refresh();
    } catch (error) {
      toast.error("Failed to update service imageUrl, try again later.");
    }
  }
  return (
    <div className="mt-2">
      <h2 className="text-xl">Edit featured image</h2>
      {!service.imageUrl && (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
      )}
      {service.imageUrl && (
        <div className="relative aspect-video mt-2">
          <Image
            alt="upload"
            fill
            className="object-cover rouned.md"
            src={service.imageUrl}
          />
        </div>
      )}
      <div>
        <FileUpload
          endpoint="serviceImage"
          onChange={(url) => {
            if (url) {
              onSubmit({ imageUrl: url });
            }
          }}
        />
        <div className="text-xs text-muted-foreground mt-4">
          16:9 ratio recommended
        </div>
      </div>
    </div>
  );
};

export default ServiceImageUrlPatchForm;
