"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

const FileUpload = ({
  onChange,
  endpoint,
}: {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}) => {
  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
      />
    </>
  );
};

export default FileUpload;
