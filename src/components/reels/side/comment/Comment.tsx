import React, { useState, useEffect } from "react";
import { getCommentsByReelId } from "../../../../data/commentData";
import type { Comment as CommentType } from "../../../../data/commentData";
import likeIcon from "@/assets/simbol/like.svg";

interface CommentListProps {
  reelId: number; // 현재 보고 있는 릴스 ID
}

const emojis = ["😊", "😂", "😍", "😢", "😡", "👍", "❤️"];

const CommentList: React.FC<CommentListProps> = ({ reelId }) => {
  // 현재 릴스 ID에 맞는 댓글만 필터링
  const [comments, setComments] = useState<CommentType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>(
    {}
  );

  // reelId가 변경될 때마다 해당 릴스의 댓글 가져오기
  useEffect(() => {
    const filteredComments = getCommentsByReelId(reelId);
    setComments(filteredComments);
  }, [reelId]);

  const handleAddComment = () => {
    if (!inputValue.trim()) return;

    const newComment: CommentType = {
      id: Date.now(), // 유니크한 ID 생성
      reelId: reelId, // 현재 릴스 ID 설정
      username: "new_user",
      content: inputValue,
      likes: 0,
      daysAgo: 0,
      profileColor: "#737373",
    };

    setComments([newComment, ...comments]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setInputValue((prev) => prev + emoji);
    setShowEmojis(false);
  };

  const toggleLike = (commentId: number) => {
    const isLiked = !likedComments[commentId];
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: isLiked,
    }));

    // 여기서만 좋아요 수를 업데이트하고, UI에서는 이 값만 사용하도록 수정
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likes + (isLiked ? 1 : -1),
          };
        }
        return comment;
      })
    );
  };

  return (
    <div
      className="w-full max-w-md mx-auto p-0 bg-black text-white rounded-xl flex flex-col"
      style={{ maxHeight: "70vh" }}
    >
      <div className="text-center py-4 text-lg font-semibold border-b border-neutral-800">
        댓글
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {comments.length > 0 ? (
          comments.map((comment: CommentType) => (
            <div
              key={comment.id}
              className="flex px-4 py-4 items-start space-x-3 mb-2"
            >
              <div
                className="w-10 h-10 rounded-full flex-shrink-0"
                style={{ backgroundColor: comment.profileColor }}
              ></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-sm">
                    {comment.username}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {comment.daysAgo}일
                  </span>
                </div>
                <p className="text-sm mt-1 leading-snug whitespace-pre-wrap">
                  {comment.content}
                </p>
                <div className="flex space-x-3 mt-1">
                  {/* 수정된 부분: likedComments 상태를 더하지 않고 comment.likes만 사용 */}
                  <span className="text-xs text-neutral-500">
                    좋아요 {comment.likes}개
                  </span>
                  <span className="text-xs text-neutral-500">답글 달기</span>
                </div>
                <div className="text-xs text-neutral-500 mt-1 underline">
                  답글 4개 모두 보기
                </div>
              </div>

              {/* 하트 버튼 유지 */}
              <button
                className="text-neutral-500 hover:text-white ml-2 mt-1"
                onClick={() => toggleLike(comment.id)}
              >
                {likedComments[comment.id] ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="#ED4956"
                  >
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                  </svg>
                ) : (
                  <img
                    src={likeIcon}
                    alt="좋아요"
                    className="w-4 h-4 brightness-0 invert opacity-80"
                  />
                )}
              </button>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-40 text-neutral-500">
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </div>
        )}
      </div>

      <div className="relative px-4 py-3 border-t border-neutral-800 bg-black">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-neutral-600 rounded-full" />
          <input
            type="text"
            placeholder="댓글 달기..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            className="flex-1 bg-transparent outline-none px-3 text-sm text-white placeholder-neutral-500"
          />

          <button
            onClick={() => setShowEmojis(!showEmojis)}
            className="text-xl"
          >
            😊
          </button>
        </div>
        {showEmojis && (
          <div className="absolute bottom-12 left-12 bg-neutral-800 rounded-lg p-2 flex space-x-2 z-10">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                className="text-xl hover:scale-110 transition-transform"
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
