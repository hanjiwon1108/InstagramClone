import SideHeader from "./sideheader/SideHeader";
import SideMain from "./sidemain/SideMain";
import SideFooter from "./sidefooter/SideFooter";

function SideBar() {
  return (
    <div className="w-full sm:w-[270px] h-[100vh] flex flex-col items-start pt-2 px-3 pb-5 border-r border-[#312e2e]">
      <SideHeader />
      <SideMain />
      <SideFooter />
    </div>
  );
}

export default SideBar;
