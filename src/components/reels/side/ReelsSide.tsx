import message from "@/assets/simbol/message.svg";
import like from "@/assets/simbol/like.svg";
import comment from "@/assets/simbol/comment.svg";
import bookmark from "@/assets/simbol/bookmark (1).svg";
import menu from "@/assets/simbol/menu.svg";
import { mockReels } from "../../../data/reelsData";

interface ReelsSideProps {
  currentReelIndex: number;
}

const ReelsSide = ({ currentReelIndex }: ReelsSideProps) => {
  const currentReel = mockReels[currentReelIndex];

  return (
    <div className="flex flex-col items-center gap-6 pl-2">
      <button title="좋아요" className="flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <img src={like} alt="Like" className="w-6 h-6 brightness-0 invert" />
        </div>
        <span className="text-xs text-white">
          {currentReel.likes.toLocaleString()}
        </span>
      </button>

      <button title="댓글" className="flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <img
            src={comment}
            alt="Comment"
            className="w-6 h-6 brightness-0 invert"
          />
        </div>
        <span className="text-xs text-white">
          {currentReel.comments.toLocaleString()}
        </span>
      </button>

      <button title="보내기" className="flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <img
            src={message}
            alt="Message"
            className="w-6 h-6 brightness-0 invert"
          />
        </div>
      </button>

      <button title="북마크" className="flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <img
            src={bookmark}
            alt="Bookmark"
            className="w-6 h-6 brightness-0 invert"
          />
        </div>
      </button>

      <button title="더보기" className="flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <img src={menu} alt="Menu" className="w-6 h-6 brightness-0 invert" />
        </div>
      </button>
    </div>
  );
};

export default ReelsSide;
