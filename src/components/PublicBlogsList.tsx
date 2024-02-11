import { Blog } from "@prisma/client";
import BlogCard from "./BlogCard";

const PublicBlogsList = ({ blogs }: { blogs: Blog[] }) => {
  const publishedBlogs = blogs.filter((blog) => blog.isPublished);

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {publishedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
        {publishedBlogs.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-10">
            No blogs found
          </div>
        )}
      </div>
    </>
  );
};

export default PublicBlogsList;
