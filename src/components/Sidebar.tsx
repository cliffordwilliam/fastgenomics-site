import Logo from "./Logo";
import SidebarLinksList from "./SidebarLinksList";

const Sidebar = () => {
  return (
    <>
      <aside className="flex flex-col border-r h-full">
        {/* logo */}
        <div className="p-6">
          <Logo />
        </div>
        {/* linkslist */}
        <SidebarLinksList />
      </aside>
    </>
  );
};

export default Sidebar;
