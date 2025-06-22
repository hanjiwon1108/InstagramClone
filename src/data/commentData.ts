export interface Comment {
  id: number;
  reelId: number; // 어떤 릴스에 속하는지 구분하는 ID
  username: string;
  content: string;
  likes: number;
  daysAgo: number;
  profileColor: string;
}

const comments: Comment[] = [
  // 릴스 1의 댓글들
  {
    id: 1,
    reelId: 1,
    username: "loveiska9ra",
    content:
      "죄송한데 이 시리즈를 좀 집중적으로 올려주십시오 기다려져서 미치겠으니깐",
    likes: 800,
    daysAgo: 1,
    profileColor: "#F87171",
  },
  {
    id: 2,
    reelId: 1,
    username: "sleeping_z1",
    content: "아진짜너무웃겨",
    likes: 4,
    daysAgo: 1,
    profileColor: "#60A5FA",
  },
  {
    id: 3,
    reelId: 1,
    username: "soul.seolhwa",
    content:
      "남주야...!! 그렇지!! 잘 봐야따라왔다!! 사랑은 쟁취다!!🙏 순애 직진 남주 응원한다!!",
    likes: 13,
    daysAgo: 1,
    profileColor: "#34D399",
  },
  {
    id: 4,
    reelId: 1,
    username: "hona_toon",
    content: "같이 학교에 빠졌다고 웅성웅성...",
    likes: 215,
    daysAgo: 1,
    profileColor: "#FBBF24",
  },
  {
    id: 5,
    reelId: 1,
    username: "peng9210",
    content: "드디어! 기다리던 클리셰 시리즈가!!!!!!!!!!!!!!!",
    likes: 10,
    daysAgo: 1,
    profileColor: "#A78BFA",
  },

  // 릴스 2의 댓글들
  {
    id: 6,
    reelId: 2,
    username: "food_lover22",
    content: "한입만이라더니 다 먹었잖아요 ㅋㅋㅋ",
    likes: 432,
    daysAgo: 2,
    profileColor: "#EC4899",
  },
  {
    id: 7,
    reelId: 2,
    username: "hungry_now",
    content: "저도 먹고 싶어요! 어디 음식인가요?",
    likes: 128,
    daysAgo: 2,
    profileColor: "#8B5CF6",
  },
  {
    id: 8,
    reelId: 2,
    username: "mukbang_fan",
    content: "이 식당 위치 공유해주세요~ 꼭 가보고 싶어요",
    likes: 67,
    daysAgo: 1,
    profileColor: "#3B82F6",
  },

  // 릴스 3의 댓글들
  {
    id: 9,
    reelId: 3,
    username: "dance_queen",
    content: "와 춤 진짜 잘 추시네요! 어디서 배우셨어요?",
    likes: 245,
    daysAgo: 3,
    profileColor: "#F59E0B",
  },
  {
    id: 10,
    reelId: 3,
    username: "kpop_lover",
    content: "이 안무 저도 도전해봐야겠어요! 너무 멋져요",
    likes: 118,
    daysAgo: 2,
    profileColor: "#EF4444",
  },
  {
    id: 11,
    reelId: 3,
    username: "rhythm_master",
    content: "음악이 뭐예요? 너무 좋아서 찾고 있어요",
    likes: 56,
    daysAgo: 1,
    profileColor: "#6366F1",
  },

  // 릴스 4의 댓글들
  {
    id: 12,
    reelId: 4,
    username: "game_pro",
    content: "이 기술 저도 써봤는데 진짜 좋더라고요! 추천합니다",
    likes: 321,
    daysAgo: 4,
    profileColor: "#06B6D4",
  },
  {
    id: 13,
    reelId: 4,
    username: "noob_gamer",
    content: "이렇게 하는 방법 좀 더 자세히 알려주실 수 있나요?",
    likes: 154,
    daysAgo: 3,
    profileColor: "#8B5CF6",
  },

  // 릴스 5의 댓글들
  {
    id: 14,
    reelId: 5,
    username: "cat_lover",
    content: "너무 귀여워요! 고양이 이름이 뭔가요?",
    likes: 189,
    daysAgo: 2,
    profileColor: "#F472B6",
  },
  {
    id: 15,
    reelId: 5,
    username: "pet_fan",
    content: "냥냥펀치 진짜 귀엽다.. 저도 키우고 싶어요",
    likes: 102,
    daysAgo: 1,
    profileColor: "#3B82F6",
  },

  // 릴스 6의 댓글들
  {
    id: 16,
    reelId: 6,
    username: "school_days",
    content: "저희 학교에서도 비슷한 일 있었어요 ㅋㅋㅋ",
    likes: 87,
    daysAgo: 1,
    profileColor: "#F59E0B",
  },
  {
    id: 17,
    reelId: 6,
    username: "student_life",
    content: "선생님 표정 보니까 더 웃겨요 ㅋㅋㅋ",
    likes: 76,
    daysAgo: 1,
    profileColor: "#4ADE80",
  },

  // 릴스 7의 댓글들
  {
    id: 18,
    reelId: 7,
    username: "laugh_addict",
    content: "진짜 10초만에 웃게 만드셨네요 ㅋㅋㅋ",
    likes: 67,
    daysAgo: 1,
    profileColor: "#10B981",
  },
  {
    id: 19,
    reelId: 7,
    username: "humor_sense",
    content: "이런 영상 더 보고싶어요! 팔로우 했습니다~",
    likes: 45,
    daysAgo: 1,
    profileColor: "#F59E0B",
  },

  // 릴스 8의 댓글들
  {
    id: 20,
    reelId: 8,
    username: "meat_lover",
    content: "삼겹살 두께가 장난 아니네요... 어디 집인지 알 수 있을까요?",
    likes: 234,
    daysAgo: 2,
    profileColor: "#EC4899",
  },
  {
    id: 21,
    reelId: 8,
    username: "food_hunter",
    content: "저 집 가봤는데 진짜 맛있어요! 강추합니다",
    likes: 112,
    daysAgo: 1,
    profileColor: "#8B5CF6",
  },
  {
    id: 22,
    reelId: 8,
    username: "bbq_master",
    content: "굽는 솜씨가 예술이네요 👍",
    likes: 65,
    daysAgo: 1,
    profileColor: "#F97316",
  },

  // 릴스 9의 댓글들
  {
    id: 23,
    reelId: 9,
    username: "app_developer",
    content: "이 앱 사용법 좀 더 자세히 알려주실 수 있나요?",
    likes: 76,
    daysAgo: 1,
    profileColor: "#4ADE80",
  },
  {
    id: 24,
    reelId: 9,
    username: "tech_savvy",
    content: "이거 안드로이드에서도 되나요?",
    likes: 43,
    daysAgo: 1,
    profileColor: "#0EA5E9",
  },

  // 릴스 10의 댓글들
  {
    id: 25,
    reelId: 10,
    username: "comedy_fan",
    content: "오늘 웃음 치료 완료했습니다 ㅋㅋㅋ",
    likes: 132,
    daysAgo: 2,
    profileColor: "#A78BFA",
  },
  {
    id: 26,
    reelId: 10,
    username: "daily_smile",
    content: "팔로우 완료! 더 많은 영상 부탁드려요~",
    likes: 98,
    daysAgo: 1,
    profileColor: "#F87171",
  },
];

// 특정 릴스 ID에 해당하는 댓글만 필터링해서 반환하는 함수
export const getCommentsByReelId = (reelId: number): Comment[] => {
  console.log("Fetching comments for reelId:", reelId); // 디버깅용
  return comments.filter((comment) => comment.reelId === reelId);
};

export default comments;
