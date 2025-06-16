import { useState } from "react";
import ReelsMain from "./main/ReelsMain";
import ReelsSide from "./side/ReelsSide";

const ReelsPage = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-black">
      <div className="relative flex justify-center w-full max-w-[540px] h-[960px]">
        {/* ReelsMain 컴포넌트에 오른쪽 패딩 추가 */}
        <div className="flex-1 pr-16">
          <ReelsMain
            currentIndex={currentReelIndex}
            onChangeIndex={setCurrentReelIndex}
          />
        </div>
        <div className="absolute right-0 bottom-0 z-10">
          <ReelsSide currentReelIndex={currentReelIndex} />
        </div>
      </div>
    </div>
  );
};

export default ReelsPage;
