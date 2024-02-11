import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="md:flex h-full">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="w-full flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
