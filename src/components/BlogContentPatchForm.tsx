"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Blog } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Tiptap from "./Tiptap";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

const BlogContentPatchForm = ({ blog }: { blog: Blog }) => {
  const route = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      content: blog.content || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.patch(`/api/blogs/${blog.id}`, values);
      toast.success("Blog content successfully updated.");
      route.refresh();
    } catch (error) {
      toast.error("Failed to update blog content, try again later.");
    }
  }
  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>content</FormLabel>
                <FormControl>
                  <Tiptap content={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>This is your blog content.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting || !isValid} type="submit">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogContentPatchForm;
