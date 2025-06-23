export interface Reel {
  id: number;
  username: string;
  caption: string;
  videoUrl: string;
  likes: number;
  comments: number;
  music: string;
}

export const mockReels: Reel[] = [
  {
    id: 1,
    username: "hellochild.official77",
    caption: "찐친이 사귀자 그러면? 현실 반응 ㅋㅋ",
    videoUrl: "https://www.youtube.com/shorts/Y8_N5ZfNegY",
    likes: 3444,
    comments: 5, // 댓글 5개 (ID 1~5)
    music: "토끼양 · 귀여워서 어쩌지",
  },
  {
    id: 2,
    username: "dailyfun",
    caption: "오늘도 한입만~ 😋",
    videoUrl: "https://www.youtube.com/shorts/BzR5MNw9B24",
    likes: 2021,
    comments: 3, // 댓글 3개 (ID 6~8)
    music: "음악 · 오늘의 추천",
  },
  {
    id: 3,
    username: "coolmoves",
    caption: "댄스 챌린지 참여했어요!",
    videoUrl: "https://www.youtube.com/shorts/ts5Y5j0s2i8",
    likes: 10234,
    comments: 3, // 댓글 3개 (ID 9~11)
    music: "댄스 · 최신 인기곡",
  },
  {
    id: 4,
    username: "gametricks",
    caption: "이렇게 하면 무조건 이김 ㄷㄷ",
    videoUrl: "https://www.youtube.com/shorts/DUv1xI2QZ08",
    likes: 8934,
    comments: 2, // 댓글 2개 (ID 12~13)
    music: "게임 · 승리의 순간",
  },
  {
    id: 5,
    username: "cutepets",
    caption: "냥냥펀치 보세요!!",
    videoUrl: "https://www.youtube.com/shorts/dTSBlCLD0cM",
    likes: 4782,
    comments: 2, // 댓글 2개 (ID 14~15)
    music: "동물 · 귀여운 순간",
  },
  {
    id: 6,
    username: "schoollife",
    caption: "학교에서 생긴 웃긴 일ㅋㅋ",
    videoUrl: "https://www.youtube.com/shorts/3DHJc8NawvA",
    likes: 5833,
    comments: 2, // 댓글 2개 (ID 16~17)
    music: "학교 · 추억의 순간",
  },
  {
    id: 7,
    username: "shortsman",
    caption: "10초만에 웃기기 도전!",
    videoUrl: "https://www.youtube.com/shorts/VusoPYTZpz8",
    likes: 7351,
    comments: 2, // 댓글 2개 (ID 18~19)
    music: "짧은 영상 · 웃음 보장",
  },
  {
    id: 8,
    username: "foodheaven",
    caption: "삼겹살 미쳤다…",
    videoUrl: "https://www.youtube.com/shorts/nUQdOIvHwFg",
    likes: 9191,
    comments: 3, // 댓글 3개 (ID 20~22)
    music: "음식 · 맛있는 순간",
  },
  {
    id: 9,
    username: "techgeek",
    caption: "이 앱 안 써봤으면 손해임",
    videoUrl: "https://www.youtube.com/shorts/NmPMdfSvRvE",
    likes: 4210,
    comments: 2, // 댓글 2개 (ID 23~24)
    music: "기술 · 최신 앱 소개",
  },
  {
    id: 10,
    username: "jokeking",
    caption: "웃기면 팔로우 ㅋㅋ",
    videoUrl: "https://www.youtube.com/shorts/7sOOpb_MaB8",
    likes: 6283,
    comments: 2, // 댓글 2개 (ID 25~26)
    music: "유머 · 웃음 폭탄",
  },
  {
    id: 11,
    username: "fashionista",
    caption: "오늘의 패션은 이거!",
    videoUrl: "https://www.youtube.com/shorts/Vtj2lgtDyTg",
    likes: 5120,
    comments: 0, // 댓글 없음
    music: "패션 · 스타일링 팁",
  },
];
