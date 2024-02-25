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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Publication } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

const PublicationTitlePatchForm = ({
  publication,
}: {
  publication: Publication;
}) => {
  const route = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: publication.title,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.patch(
        `/api/publications/${publication.id}`,
        values
      );
      toast.success("Publication title successfully updated.");
      route.refresh();
    } catch (error) {
      toast.error("Failed to update publication title, try again later.");
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'Prisma is amazing'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your publication title.
                </FormDescription>
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

export default PublicationTitlePatchForm;
