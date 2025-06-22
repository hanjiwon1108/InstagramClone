export interface ShareOption {
  id: number;
  name: string;
  icon: string; // 아이콘 경로 또는 이름
}

export const shareOptions: ShareOption[] = [
  {
    id: 1,
    name: "메시지 보내기",
    icon: "message",
  },
  {
    id: 2,
    name: "Instagram에 게시",
    icon: "instagram",
  },
  {
    id: 3,
    name: "Facebook에 공유",
    icon: "facebook",
  },
  {
    id: 4,
    name: "Twitter에 공유",
    icon: "twitter",
  },
  {
    id: 5,
    name: "WhatsApp에 공유",
    icon: "whatsapp",
  },
  {
    id: 6,
    name: "이메일로 공유",
    icon: "email",
  },
  {
    id: 7,
    name: "링크 복사",
    icon: "link",
  },
  {
    id: 8,
    name: "카카오톡으로 공유",
    icon: "kakaotalk",
  },
];

export const friendsList = [
  {
    id: 1,
    username: "friend_user1",
    fullName: "친구 1",
    profileColor: "#F87171",
  },
  {
    id: 2,
    username: "friend_user2",
    fullName: "친구 2",
    profileColor: "#60A5FA",
  },
  {
    id: 3,
    username: "friend_user3",
    fullName: "친구 3",
    profileColor: "#34D399",
  },
  {
    id: 4,
    username: "friend_user4",
    fullName: "친구 4",
    profileColor: "#FBBF24",
  },
  {
    id: 5,
    username: "friend_user5",
    fullName: "친구 5",
    profileColor: "#A78BFA",
  },
];
