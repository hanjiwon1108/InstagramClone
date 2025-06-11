import HomeIcon from "@/assets/simbol/home.svg";
import SearchIcon from "@/assets/simbol/search.svg";
import FindIcon from "@/assets/simbol/find.svg";
import ReelsIcon from "@/assets/simbol/reels.svg";
import MessageIcon from "@/assets/simbol/message.svg";
import LikeIcon from "@/assets/simbol/like.svg";
import AddIcon from "@/assets/simbol/add.svg";
import DefaultProfile from "@/assets/simbol/default.png";

function SideMain() {
  const menuItems = [
    {
      id: 1,
      icon: HomeIcon,
      name: "홈",
    },
    {
      id: 2,
      icon: SearchIcon,
      name: "검색",
    },
    {
      id: 3,
      icon: FindIcon,
      name: "탐색 탭",
    },
    {
      id: 4,
      icon: ReelsIcon,
      name: "릴스",
    },
    {
      id: 5,
      icon: MessageIcon,
      name: "메시지",
    },
    {
      id: 6,
      icon: LikeIcon,
      name: "알림",
    },
    {
      id: 7,
      icon: AddIcon,
      name: "만들기",
    },
    {
      id: 8,
      icon: DefaultProfile,
      name: "프로필",
    },
  ];

  return (
    <div className="w-full h-[100vh] flex flex-col items-start">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="flex my-1 w-full p-3 gap-4 hover:bg-[#272626] rounded-md cursor-pointer"
        >
          <img
            src={item.icon}
            alt={item.name}
            className={`w-[26px] h-[26px] block ${
              item.id !== 8 ? "brightness-0 invert" : "rounded-full"
            }`}
            style={{ display: "block" }}
          />
          <span
            className={`text-lg ${item.id === 4 ? "font-bold" : "font-normal"}`}
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SideMain;
