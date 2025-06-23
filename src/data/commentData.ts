export interface Comment {
  id: number;
  reelId: number; // 어떤 릴스에 속하는지 구분하는 ID
  username: string;
  content: string;
  likes: number;
  daysAgo: number;
  profileColor: string;
  replies: number; // 답글 개수 필드 추가
}

// 대댓글 인터페이스 추가
export interface Reply {
  id: number;
  commentId: number; // 부모 댓글 ID
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
    replies: 4,
  },
  {
    id: 2,
    reelId: 1,
    username: "sleeping_z1",
    content: "아진짜너무웃겨",
    likes: 4,
    daysAgo: 1,
    profileColor: "#60A5FA",
    replies: 2,
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
    replies: 5,
  },
  {
    id: 4,
    reelId: 1,
    username: "hona_toon",
    content: "같이 학교에 빠졌다고 웅성웅성...",
    likes: 215,
    daysAgo: 1,
    profileColor: "#FBBF24",
    replies: 8,
  },
  {
    id: 5,
    reelId: 1,
    username: "peng9210",
    content: "드디어! 기다리던 클리셰 시리즈가!!!!!!!!!!!!!!!",
    likes: 10,
    daysAgo: 1,
    profileColor: "#A78BFA",
    replies: 3,
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
    replies: 7,
  },
  {
    id: 7,
    reelId: 2,
    username: "hungry_now",
    content: "저도 먹고 싶어요! 어디 음식인가요?",
    likes: 128,
    daysAgo: 2,
    profileColor: "#8B5CF6",
    replies: 4,
  },
  {
    id: 8,
    reelId: 2,
    username: "mukbang_fan",
    content: "이 식당 위치 공유해주세요~ 꼭 가보고 싶어요",
    likes: 67,
    daysAgo: 1,
    profileColor: "#3B82F6",
    replies: 2,
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
    replies: 6,
  },
  {
    id: 10,
    reelId: 3,
    username: "kpop_lover",
    content: "이 안무 저도 도전해봐야겠어요! 너무 멋져요",
    likes: 118,
    daysAgo: 2,
    profileColor: "#EF4444",
    replies: 3,
  },
  {
    id: 11,
    reelId: 3,
    username: "rhythm_master",
    content: "음악이 뭐예요? 너무 좋아서 찾고 있어요",
    likes: 56,
    daysAgo: 1,
    profileColor: "#6366F1",
    replies: 5,
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
    replies: 9,
  },
  {
    id: 13,
    reelId: 4,
    username: "noob_gamer",
    content: "이렇게 하는 방법 좀 더 자세히 알려주실 수 있나요?",
    likes: 154,
    daysAgo: 3,
    profileColor: "#8B5CF6",
    replies: 4,
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
    replies: 6,
  },
  {
    id: 15,
    reelId: 5,
    username: "pet_fan",
    content: "냥냥펀치 진짜 귀엽다.. 저도 키우고 싶어요",
    likes: 102,
    daysAgo: 1,
    profileColor: "#3B82F6",
    replies: 3,
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
    replies: 2,
  },
  {
    id: 17,
    reelId: 6,
    username: "student_life",
    content: "선생님 표정 보니까 더 웃겨요 ㅋㅋㅋ",
    likes: 76,
    daysAgo: 1,
    profileColor: "#4ADE80",
    replies: 4,
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
    replies: 1,
  },
  {
    id: 19,
    reelId: 7,
    username: "humor_sense",
    content: "이런 영상 더 보고싶어요! 팔로우 했습니다~",
    likes: 45,
    daysAgo: 1,
    profileColor: "#F59E0B",
    replies: 0,
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
    replies: 7,
  },
  {
    id: 21,
    reelId: 8,
    username: "food_hunter",
    content: "저 집 가봤는데 진짜 맛있어요! 강추합니다",
    likes: 112,
    daysAgo: 1,
    profileColor: "#8B5CF6",
    replies: 2,
  },
  {
    id: 22,
    reelId: 8,
    username: "bbq_master",
    content: "굽는 솜씨가 예술이네요 👍",
    likes: 65,
    daysAgo: 1,
    profileColor: "#F97316",
    replies: 3,
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
    replies: 5,
  },
  {
    id: 24,
    reelId: 9,
    username: "tech_savvy",
    content: "이거 안드로이드에서도 되나요?",
    likes: 43,
    daysAgo: 1,
    profileColor: "#0EA5E9",
    replies: 1,
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
    replies: 3,
  },
  {
    id: 26,
    reelId: 10,
    username: "daily_smile",
    content: "팔로우 완료! 더 많은 영상 부탁드려요~",
    likes: 98,
    daysAgo: 1,
    profileColor: "#F87171",
    replies: 2,
  },
];

// 대댓글 데이터 추가
const repliesData: Reply[] = [
  // 댓글 ID 1의 대댓글들
  {
    id: 101,
    commentId: 1,
    username: "fan_123",
    content: "저도 너무 좋아하는 시리즈예요!",
    likes: 45,
    daysAgo: 1,
    profileColor: "#34D399",
  },
  {
    id: 102,
    commentId: 1,
    username: "drama_watcher",
    content: "업데이트 주기가 너무 느려요 ㅠㅠ",
    likes: 32,
    daysAgo: 1,
    profileColor: "#FBBF24",
  },
  {
    id: 103,
    commentId: 1,
    username: "k_content_love",
    content: "다음편 언제 나오나요??",
    likes: 18,
    daysAgo: 0,
    profileColor: "#A78BFA",
  },
  {
    id: 104,
    commentId: 1,
    username: "series_addict",
    content: "작가님 다음편도 기대할게요!",
    likes: 15,
    daysAgo: 0,
    profileColor: "#F87171",
  },

  // 댓글 ID 2의 대댓글들
  {
    id: 105,
    commentId: 2,
    username: "comedy_fan",
    content: "특히 마지막 부분이 압권이었어요 ㅋㅋㅋ",
    likes: 8,
    daysAgo: 1,
    profileColor: "#60A5FA",
  },
  {
    id: 106,
    commentId: 2,
    username: "laughing_out_loud",
    content: "이거 몇번을 봐도 웃겨요",
    likes: 5,
    daysAgo: 0,
    profileColor: "#EC4899",
  },

  // 댓글 ID 3의 대댓글들
  {
    id: 107,
    commentId: 3,
    username: "romance_addict",
    content: "순애물 찐팬이세요?",
    likes: 7,
    daysAgo: 1,
    profileColor: "#8B5CF6",
  },
  {
    id: 108,
    commentId: 3,
    username: "happy_ending",
    content: "저도 남주 응원합니다!",
    likes: 6,
    daysAgo: 1,
    profileColor: "#F59E0B",
  },
  {
    id: 109,
    commentId: 3,
    username: "drama_queen",
    content: "이 작품 너무 좋아요",
    likes: 4,
    daysAgo: 0,
    profileColor: "#10B981",
  },
  {
    id: 110,
    commentId: 3,
    username: "lovey_dovey",
    content: "여주도 너무 사랑스러워요",
    likes: 3,
    daysAgo: 0,
    profileColor: "#3B82F6",
  },
  {
    id: 111,
    commentId: 3,
    username: "heart_flutter",
    content: "이 장면에서 심쿵했어요",
    likes: 2,
    daysAgo: 0,
    profileColor: "#F472B6",
  },

  // 나머지 댓글들에 대한 대댓글도 일부 추가
  {
    id: 112,
    commentId: 4,
    username: "school_story",
    content: "우리 학교에서도 비슷한 일이...",
    likes: 42,
    daysAgo: 1,
    profileColor: "#4ADE80",
  },
  {
    id: 113,
    commentId: 4,
    username: "class_clown",
    content: "다들 선생님 몰래 봤겠죠? ㅋㅋ",
    likes: 35,
    daysAgo: 1,
    profileColor: "#F97316",
  },

  // 더 많은 대댓글 추가...
  // 필요한 만큼 각 댓글에 대한 대댓글을 추가할 수 있습니다.
];

// 특정 릴스 ID에 해당하는 댓글만 필터링해서 반환하는 함수
export const getCommentsByReelId = (reelId: number): Comment[] => {
  console.log("Fetching comments for reelId:", reelId); // 디버깅용
  return comments.filter((comment) => comment.reelId === reelId);
};

// 특정 댓글 ID에 해당하는 대댓글을 반환하는 함수 추가
export const getRepliesByCommentId = (commentId: number): Reply[] => {
  return repliesData.filter((reply) => reply.commentId === commentId);
};

// 대댓글 데이터 내보내기
export const replies = repliesData;

export default comments;
