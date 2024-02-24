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
import { Service } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

const ServiceContentPatchForm = ({ service }: { service: Service }) => {
  const route = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: service.content || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.patch(`/api/services/${service.id}`, values);
      toast.success("Service content successfully updated.");
      route.refresh();
    } catch (error) {
      toast.error("Failed to update service content, try again later.");
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'Prisma is amazing'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your service content.</FormDescription>
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

export default ServiceContentPatchForm;
