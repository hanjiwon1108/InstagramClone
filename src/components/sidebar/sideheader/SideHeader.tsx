import Logo from "@/assets/simbol/logo.svg";

function SideHeader() {
  return (
    <>
      <div className="w-full sm:h-[140px]">
        <img
          src={Logo}
          alt="Logo"
          className="w-[118px] h-auto pt-8 ml-[12px] mb-[16px] brightness-0 invert"
          style={{ display: "block" }}
        />
      </div>
    </>
  );
}

export default SideHeader;
