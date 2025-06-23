import { useState, useEffect, useRef } from "react";
import message from "@/assets/simbol/message.svg";
import comment from "@/assets/simbol/comment.svg";
import menu from "@/assets/simbol/menu.svg";
import { mockReels } from "../../../data/reelsData";
import CommentList from "./comment/Comment";
import ShareModal from "./share/ShareModal"; // 추가

interface ReelsSideProps {
  currentReelIndex: number;
  style?: React.CSSProperties; // 스타일 속성 추가
}

const ReelsSide = ({ currentReelIndex, style = {} }: ReelsSideProps) => {
  const currentReel = mockReels[currentReelIndex];
  const modalRef = useRef<HTMLDivElement>(null);
  const commentBtnRef = useRef<HTMLButtonElement>(null);

  // 각 릴스별 좋아요 상태를 저장하는 객체
  const [likedState, setLikedState] = useState<Record<string, boolean>>({});

  // 각 릴스별 좋아요 수를 저장하는 객체
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  // 각 릴스별 댓글 수를 저장하는 객체 추가
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>(
    {}
  );

  // 각 릴스별 북마크 상태를 저장하는 객체
  const [bookmarkedState, setBookmarkedState] = useState<
    Record<string, boolean>
  >({});

  // 댓글 모달 표시 상태
  const [showComments, setShowComments] = useState<boolean>(false);

  // 공유 모달 표시 상태 추가
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  // 현재 릴스의 좋아요 상태 및 좋아요 수 계산
  const isLiked = likedState[currentReel.id] || false;
  const likeCount =
    likeCounts[currentReel.id] !== undefined
      ? likeCounts[currentReel.id]
      : currentReel.likes;

  // 현재 릴스의 댓글 수 계산
  const commentCount =
    commentCounts[currentReel.id] !== undefined
      ? commentCounts[currentReel.id]
      : currentReel.comments;

  const isBookmarked = bookmarkedState[currentReel.id] || false;

  // 컴포넌트 마운트 시 초기 상태 설정
  useEffect(() => {
    // 아직 설정되지 않은 릴스의 초기 상태만 설정
    mockReels.forEach((reel) => {
      setLikeCounts((prev) => ({
        ...prev,
        [reel.id]: prev[reel.id] !== undefined ? prev[reel.id] : reel.likes,
      }));

      // 댓글 수 초기화
      setCommentCounts((prev) => ({
        ...prev,
        [reel.id]: prev[reel.id] !== undefined ? prev[reel.id] : reel.comments,
      }));
    });
  }, []);

  // 릴스가 변경될 때만 댓글 모달 닫기
  useEffect(() => {
    setShowComments(false);
    setShowShareModal(false); // 공유 모달도 닫기
  }, [currentReelIndex]);

  const handleLikeClick = () => {
    // 애니메이션 상태 활성화
    setIsHeartAnimating(true);

    // 해당 릴스의 좋아요 상태 토글
    const newLikedState = !isLiked;
    setLikedState((prev) => ({
      ...prev,
      [currentReel.id]: newLikedState,
    }));

    // 해당 릴스의 좋아요 수 업데이트
    setLikeCounts((prev) => ({
      ...prev,
      [currentReel.id]: newLikedState
        ? (prev[currentReel.id] || currentReel.likes) + 1
        : (prev[currentReel.id] || currentReel.likes) - 1,
    }));

    // 애니메이션이 끝난 후 상태 초기화 (300ms 후)
    setTimeout(() => {
      setIsHeartAnimating(false);
    }, 300);
  };

  const handleBookmarkClick = () => {
    // 해당 릴스의 북마크 상태 토글
    setBookmarkedState((prev) => ({
      ...prev,
      [currentReel.id]: !isBookmarked,
    }));
  };

  // 댓글이 추가될 때 호출될 함수
  const handleCommentAdded = () => {
    setCommentCounts((prev) => ({
      ...prev,
      [currentReel.id]: (prev[currentReel.id] || currentReel.comments) + 1,
    }));
  };

  const handleCommentClick = () => {
    // 댓글 모달 토글
    setShowComments((prev) => !prev);
    setShowShareModal(false); // 공유 모달 닫기
  };

  const handleShareClick = () => {
    // 공유 모달 토글
    setShowShareModal((prev) => !prev);
    setShowComments(false); // 댓글 모달 닫기
  };

  return (
    <div
      className="flex flex-col items-center gap-6 pl-2 relative"
      style={style} // 부모에서 전달된 스타일 적용
    >
      <button
        title="좋아요"
        className="flex flex-col items-center"
        onClick={handleLikeClick}
      >
        <div className="w-10 h-10 flex items-center justify-center">
          {isLiked ? (
            // 채워진 하트 SVG - 애니메이션 적용
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-7 h-7 transition-transform duration-300 ${
                isHeartAnimating ? "scale-125" : "scale-100"
              }`}
              fill="#ED4956" // 인스타그램 빨간색
            >
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
          ) : (
            // 테두리만 있는 하트 SVG - 애니메이션 적용
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-7 h-7 transition-transform duration-300 ${
                isHeartAnimating ? "scale-125" : "scale-100"
              }`}
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
          )}
        </div>
        <span className="text-xs text-white">{likeCount.toLocaleString()}</span>
      </button>

      <button
        ref={commentBtnRef}
        title="댓글"
        className="flex flex-col items-center"
        onClick={handleCommentClick}
      >
        <div className="w-10 h-10 flex items-center justify-center">
          <img
            src={comment}
            alt="Comment"
            className="w-7 h-7 brightness-0 invert"
          />
        </div>
        <span className="text-xs text-white">
          {commentCount.toLocaleString()}
        </span>
      </button>

      <button
        title="보내기"
        className="flex flex-col items-center"
        onClick={handleShareClick}
      >
        <div className="w-10 h-10 flex items-center justify-center">
          <img
            src={message}
            alt="Message"
            className="w-7 h-7 brightness-0 invert"
          />
        </div>
      </button>

      <button
        title="북마크"
        className="flex flex-col items-center"
        onClick={handleBookmarkClick}
      >
        <div className="w-10 h-10 flex items-center justify-center">
          {isBookmarked ? (
            // 채워진 북마크 SVG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-7 h-7 transition-transform duration-300"
              fill="white"
            >
              <path d="M19,21l-7-5l-7,5V5c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2V21z" />
            </svg>
          ) : (
            // 테두리만 있는 북마크 SVG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-7 h-7 transition-transform duration-300"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19,21l-7-5l-7,5V5c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2V21z" />
            </svg>
          )}
        </div>
      </button>

      <button title="더보기" className="flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <img src={menu} alt="Menu" className="w-7 h-7 brightness-0 invert" />
        </div>
      </button>

      {/* 댓글 버튼 옆에 나타나는 모달 */}
      {showComments && (
        <div
          ref={modalRef}
          className="absolute z-50 sm:left-20 left-12 -top-[500px] sm:w-[350px] w-[280px] rounded-xl shadow-md"
          style={{
            maxHeight: "70vh",
            overflow: "auto",
          }}
        >
          <CommentList
            reelId={Number(currentReel.id)}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      )}

      {/* 공유 모달 */}
      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};

export default ReelsSide;
