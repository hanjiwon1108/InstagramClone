import React, { useState, useMemo } from "react";
import { shareOptions, friendsList } from "../../../../data/shareData";

interface ShareModalProps {
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  // 검색어에 따라 친구 목록 필터링
  const filteredFriends = useMemo(() => {
    if (!searchText.trim()) return friendsList;

    const searchLower = searchText.toLowerCase();
    return friendsList.filter(
      (friend) =>
        friend.username.toLowerCase().includes(searchLower) ||
        friend.fullName.toLowerCase().includes(searchLower)
    );
  }, [searchText]);

  const toggleFriend = (friendId: number) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-[#262626] rounded-xl w-full max-w-[600px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          /* 스크롤바 스타일 커스터마이징 */
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #3a3a3a; /* 스크롤바 트랙 색상 */
            border-radius: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #555555; /* 스크롤바 색상 */
            border-radius: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #666666;
          }

          /* Firefox에 대한 스타일 */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #555555 #3a3a3a;
          }
        `}</style>

        {/* 헤더 */}
        <div className="relative border-b border-neutral-700 py-3">
          <h2 className="text-center text-white font-semibold">공유</h2>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* 검색창 */}
        <div className="p-4 border-b border-neutral-700">
          <div className="relative">
            <input
              type="text"
              placeholder="검색..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-[#363636] rounded-lg py-2 pl-10 pr-3 text-white text-sm focus:outline-none"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* 친구 목록 */}
        <div className="px-4 py-3 max-h-[220px] overflow-y-auto custom-scrollbar">
          <h3 className="text-white font-semibold text-sm mb-3">친구</h3>
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between py-2 cursor-pointer hover:bg-neutral-700/50 px-3 rounded"
                onClick={() => toggleFriend(friend.id)}
              >
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full mr-3"
                    style={{ backgroundColor: friend.profileColor }}
                  ></div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {friend.username}
                    </p>
                    <p className="text-neutral-400 text-xs">
                      {friend.fullName}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border ${
                    selectedFriends.includes(friend.id)
                      ? "bg-blue-500 border-blue-500"
                      : "border-neutral-500"
                  }`}
                >
                  {selectedFriends.includes(friend.id) && (
                    <svg
                      className="w-full h-full text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </svg>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-neutral-400">
              검색 결과가 없습니다
            </div>
          )}
        </div>

        {/* 공유 옵션 목록 - 일자로 변경 */}
        <div className="p-4 border-t border-neutral-700">
          <h3 className="text-white font-semibold text-sm mb-3">공유 대상</h3>
          <div className="flex overflow-x-auto space-x-5 pb-3 custom-scrollbar">
            {shareOptions.map((option) => (
              <div
                key={option.id}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div className="w-14 h-14 rounded-full bg-neutral-700 flex items-center justify-center mb-2">
                  <span className="text-xl">
                    {option.icon === "kakaotalk"
                      ? "🐥"
                      : option.icon === "instagram"
                      ? "📷"
                      : option.icon === "facebook"
                      ? "👍"
                      : option.icon === "twitter"
                      ? "🐦"
                      : option.icon === "whatsapp"
                      ? "📱"
                      : option.icon === "email"
                      ? "✉️"
                      : option.icon === "link"
                      ? "🔗"
                      : "💬"}
                  </span>
                </div>
                <span className="text-white text-xs text-center w-16 line-clamp-1">
                  {option.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 메시지 전송 버튼 */}
        <div className="p-4 border-t border-neutral-700">
          <button
            className={`w-full py-3 rounded-lg font-semibold ${
              selectedFriends.length > 0
                ? "bg-blue-500 text-white"
                : "bg-blue-500/50 text-white/70"
            }`}
            disabled={selectedFriends.length === 0}
          >
            메시지 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
