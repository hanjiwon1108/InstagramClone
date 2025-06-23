import React, { useState, useEffect } from "react";
import {
  getCommentsByReelId,
  replies as initialReplies,
} from "../../../../data/commentData";
import type {
  Comment as CommentType,
  Reply,
} from "../../../../data/commentData";
import likeIcon from "@/assets/simbol/like.svg";

interface CommentListProps {
  reelId: number; // 현재 보고 있는 릴스 ID
  onCommentAdded?: () => void; // 댓글이 추가될 때 호출될 콜백 함수
}

const emojis = ["😊", "😂", "😍", "😢", "😡", "👍", "❤️"];

const CommentList: React.FC<CommentListProps> = ({
  reelId,
  onCommentAdded,
}) => {
  // 현재 릴스 ID에 맞는 댓글만 필터링
  const [comments, setComments] = useState<CommentType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>(
    {}
  );

  // 대댓글 좋아요 상태 추가
  const [likedReplies, setLikedReplies] = useState<Record<number, boolean>>({});

  // 대댓글 관련 상태 추가
  const [replies, setReplies] = useState<Reply[]>(initialReplies);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set()
  );
  const [replyToComment, setReplyToComment] = useState<number | null>(null);
  const [replyInputValue, setReplyInputValue] = useState("");

  // reelId가 변경될 때마다 해당 릴스의 댓글 가져오기
  useEffect(() => {
    const filteredComments = getCommentsByReelId(reelId);
    setComments(filteredComments);

    // 대댓글 상태 초기화
    setReplyToComment(null);
    setExpandedComments(new Set());
  }, [reelId]);

  const handleAddComment = () => {
    if (!inputValue.trim()) return;

    const newComment: CommentType = {
      id: Date.now(), // 유니크한 ID 생성
      reelId: reelId, // 현재 릴스 ID 설정
      username: "j1wonex",
      content: inputValue,
      likes: 0,
      daysAgo: 0,
      profileColor: "#737373",
      replies: 0, // 새 댓글에는 대댓글이 없음
    };

    setComments([newComment, ...comments]);
    setInputValue("");

    // 댓글이 추가되면 부모 컴포넌트에 알림
    if (onCommentAdded) {
      onCommentAdded();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const handleReplyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing && replyToComment) {
      e.preventDefault();
      handleAddReply();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    if (replyToComment) {
      setReplyInputValue((prev) => prev + emoji);
    } else {
      setInputValue((prev) => prev + emoji);
    }
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

  // 대댓글 좋아요 토글 함수 추가
  const toggleReplyLike = (replyId: number) => {
    const isLiked = !likedReplies[replyId];
    setLikedReplies((prev) => ({
      ...prev,
      [replyId]: isLiked,
    }));

    // 대댓글의 좋아요 수 업데이트
    setReplies((prevReplies) =>
      prevReplies.map((reply) => {
        if (reply.id === replyId) {
          return {
            ...reply,
            likes: reply.likes + (isLiked ? 1 : -1),
          };
        }
        return reply;
      })
    );
  };

  // 대댓글 추가 함수
  const handleAddReply = () => {
    if (!replyInputValue.trim() || !replyToComment) return;

    const newReply: Reply = {
      id: Date.now(),
      commentId: replyToComment,
      username: "j1wonex",
      content: replyInputValue,
      likes: 0,
      daysAgo: 0,
      profileColor: "#737373",
    };

    // 대댓글 배열에 새 대댓글 추가
    const updatedReplies = [...replies, newReply];
    setReplies(updatedReplies);
    setReplyInputValue("");

    // 댓글의 replies 카운트 증가
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === replyToComment) {
          return {
            ...comment,
            replies: comment.replies + 1,
          };
        }
        return comment;
      })
    );

    // 댓글이 추가되면 부모 컴포넌트에 알림
    if (onCommentAdded) {
      onCommentAdded();
    }
  };

  // 대댓글 토글 함수
  const toggleReplies = (commentId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  // 답글 달기 클릭 함수
  const handleReplyClick = (commentId: number) => {
    setReplyToComment(commentId === replyToComment ? null : commentId);
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      newSet.add(commentId);
      return newSet;
    });
    setReplyInputValue("");
  };

  // 특정 댓글에 달린 대댓글 필터링
  const getCommentReplies = (commentId: number) => {
    return replies.filter((reply) => reply.commentId === commentId);
  };

  return (
    <div
      className="w-full max-w-md mx-auto p-0 bg-neutral-800 text-white rounded-xl flex flex-col"
      style={{ maxHeight: "70vh" }}
    >
      <div className="text-center py-4 text-lg font-semibold border-b border-neutral-700">
        댓글
      </div>

      <div
        className="flex-1 overflow-y-auto bg-neutral-800"
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
            <div key={comment.id} className="mb-4">
              <div className="flex px-4 py-2 items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: comment.profileColor }}
                ></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">
                      {comment.username}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {comment.daysAgo}일
                    </span>
                  </div>
                  <p className="text-sm mt-1 leading-snug whitespace-pre-wrap">
                    {comment.content}
                  </p>
                  <div className="flex space-x-3 mt-1">
                    <span className="text-xs text-neutral-400">
                      좋아요 {comment.likes}개
                    </span>
                    <button
                      className="text-xs text-neutral-400 hover:text-neutral-300"
                      onClick={() => handleReplyClick(comment.id)}
                    >
                      답글 달기
                    </button>
                  </div>

                  {comment.replies > 0 && (
                    <button
                      className="text-xs text-neutral-400 mt-1 hover:text-neutral-300"
                      onClick={() => toggleReplies(comment.id)}
                    >
                      {expandedComments.has(comment.id)
                        ? "답글 숨기기"
                        : `답글 ${comment.replies}개 모두 보기`}
                    </button>
                  )}
                </div>

                {/* 하트 버튼 유지 */}
                <button
                  className="text-neutral-400 hover:text-white ml-2 mt-1"
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

              {/* 대댓글 목록 */}
              {expandedComments.has(comment.id) && (
                <div className="pl-14 pr-4">
                  {getCommentReplies(comment.id).map((reply) => (
                    <div
                      key={reply.id}
                      className="flex py-2 items-start space-x-3"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: reply.profileColor }}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">
                            {reply.username}
                          </span>
                          <span className="text-xs text-neutral-400">
                            {reply.daysAgo}일
                          </span>
                        </div>
                        <p className="text-sm mt-1 leading-snug whitespace-pre-wrap">
                          {reply.content}
                        </p>
                        <div className="flex space-x-3 mt-1">
                          <span className="text-xs text-neutral-400">
                            좋아요 {reply.likes}개
                          </span>
                          <button
                            className="text-xs text-neutral-400 hover:text-neutral-300"
                            onClick={() => handleReplyClick(comment.id)}
                          >
                            답글 달기
                          </button>
                        </div>
                      </div>

                      {/* 대댓글 하트 버튼 추가 */}
                      <button
                        className="text-neutral-400 hover:text-white ml-2 mt-1"
                        onClick={() => toggleReplyLike(reply.id)}
                      >
                        {likedReplies[reply.id] ? (
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
                  ))}

                  {/* 대댓글 입력 폼 */}
                  {replyToComment === comment.id && (
                    <div className="flex items-center my-2 bg-neutral-900 p-2 rounded-lg">
                      <div className="w-6 h-6 bg-neutral-600 rounded-full mr-2" />
                      <input
                        type="text"
                        placeholder={`${comment.username}님에게 답글 달기...`}
                        value={replyInputValue}
                        onChange={(e) => setReplyInputValue(e.target.value)}
                        onKeyDown={handleReplyKeyDown}
                        onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)}
                        className="flex-1 bg-transparent outline-none px-2 text-xs text-white placeholder-neutral-400"
                      />
                      <button
                        onClick={handleAddReply}
                        className="text-blue-500 text-xs font-semibold disabled:opacity-50 disabled:text-neutral-400"
                        disabled={!replyInputValue.trim()}
                      >
                        게시
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-40 text-neutral-400">
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </div>
        )}
      </div>

      <div className="relative px-4 py-3 border-t border-neutral-700 bg-neutral-800">
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
            className="flex-1 bg-transparent outline-none px-3 text-sm text-white placeholder-neutral-400"
          />

          <button
            onClick={() => setShowEmojis(!showEmojis)}
            className="text-xl"
          >
            😊
          </button>
        </div>
        {showEmojis && (
          <div className="absolute bottom-12 left-12 bg-neutral-700 rounded-lg p-2 flex space-x-2 z-10">
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
