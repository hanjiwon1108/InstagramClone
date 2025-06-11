import Threads from "@/assets/simbol/threads.png";
import Menu from "@/assets/simbol/menu.svg";

function SideMain() {
  const menuItems = [
    {
      id: 1,
      icon: Threads,
      name: "Threads",
    },
    {
      id: 2,
      icon: Menu,
      name: "더보기",
    },
  ];

  return (
    <div className="w-full sm:h-[112px] flex flex-col items-start">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="flex my-1 w-full p-3 gap-4 hover:bg-[#272626] rounded-md cursor-pointer"
        >
          <img
            src={item.icon}
            alt={item.name}
            className={`w-[26px] h-[26px] block ${
              item.id !== 8 ? "brightness-0 invert" : ""
            }`}
            style={{ display: "block" }}
          />
          <span className={"text-lg font-normal"}>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default SideMain;
