import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <>
      <Button>Click</Button>
      <UserButton afterSignOutUrl="/" />
    </>
  );
};

export default Page;
