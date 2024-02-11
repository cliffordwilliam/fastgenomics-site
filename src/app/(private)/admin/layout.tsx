import IsUserAdmin from "@/lib/IsUserAdmin";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!IsUserAdmin(userId)) {
    redirect("/");
  }
  return <>{children}</>;
};

export default Layout;
