import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div>
        <Link href={"/admin/createBlog"}>
          <Button>Add blog</Button>
        </Link>
      </div>
    </>
  );
};

export default Page;
