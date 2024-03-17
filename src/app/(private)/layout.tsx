import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="md:flex h-full min-h-screen">
        {/* sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        {/* right side */}
        <div className="h-full min-h-screen w-full flex flex-col">
          {/* top navabr */}
          <Navbar />
          {/* bottom main */}
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
