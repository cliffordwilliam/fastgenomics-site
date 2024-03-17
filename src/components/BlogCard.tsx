import { Blog } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <Link href={`searchBlogs/${blog.id}`}>
        <div className="group hover:shadow-sm overflow-hidden border rounded-lg p-3 h-full">
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              fill
              className="object-cover"
              alt={blog.title}
              src={blog.imageUrl || ""}
            />
          </div>
          <div className="flex flex-col pt-2">
            <h2 className="text-lg font-medium group-hover:text-sky-700 line-clamp-2">
              {blog.title}
            </h2>
            <span className="group-hover:text-sky-700">Read more</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
