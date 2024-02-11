import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Burger = () => {
  return (
    <>
      <Sheet>
        <SheetContent side={"left"} className="p-0">
          <Sidebar />
        </SheetContent>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
      </Sheet>
    </>
  );
};

export default Burger;
