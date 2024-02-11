"use client";

import { Blog } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const BlogPublishPatchButton = ({
  blog,
  isComplete,
}: {
  blog: Blog;
  isComplete: boolean;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onPublish = async () => {
    try {
      setIsLoading(true);
      if (blog.isPublished) {
        await axios.patch(`/api/blogs/${blog.id}/unpublish`);
        toast.success("Blog successfully unpublished.");
      } else {
        await axios.patch(`/api/blogs/${blog.id}/publish`);
        toast.success("Blog successfully published.");
      }
      router.refresh();
    } catch (error) {
      toast.error("Failed to update blog published state.");
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
        {blog.isPublished ? "Unpublish" : "Publish"}
      </Button>
    </>
  );
};

export default BlogPublishPatchButton;
