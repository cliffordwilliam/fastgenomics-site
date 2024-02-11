import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="md:flex h-full">
        {/* sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        {/* right side */}
        <div className="w-full flex flex-col">
          {/* top navabr */}
          <Navbar />
          {/* bottom main */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
