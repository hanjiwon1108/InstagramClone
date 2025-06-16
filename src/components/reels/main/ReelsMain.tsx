import { useRef, useEffect, useCallback, useState } from "react";
import Profile from "@/assets/simbol/default.png";
import { mockReels } from "../../../data/reelsData";
import type { Dispatch, SetStateAction } from "react";

interface ReelsMainProps {
  currentIndex: number;
  onChangeIndex: Dispatch<SetStateAction<number>>;
}

const ReelsMain = ({ currentIndex, onChangeIndex }: ReelsMainProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | HTMLIFrameElement | null)[]>([]);
  // 무한 스크롤을 위한 상태
  const [reelsCount, setReelsCount] = useState(3); // 초기 반복 횟수
  const [isScrolling, setIsScrolling] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true); // 자동 스크롤 제어

  // 동적으로 증가하는 반복 데이터 생성
  const repeatedReels = Array(reelsCount)
    .fill(null)
    .flatMap((_, repIndex) =>
      mockReels.map((reel) => ({
        ...reel,
        tempId: `${reel.id}-${repIndex}`, // 고유 식별자 추가
      }))
    );

  // 실제 인덱스 계산 (반복 처리)
  const getRealIndex = useCallback(
    (index: number) => index % mockReels.length,
    []
  );

  // 모든 비디오를 재생 상태로 유지하는 함수
  const playAllVideos = useCallback(() => {
    videoRefs.current.forEach((element) => {
      if (element instanceof HTMLVideoElement) {
        if (element.paused) {
          element
            .play()
            .catch((err) => console.error("비디오 재생 실패:", err));
        }
      }
    });
  }, []);

  // 현재 보이는 비디오만 인덱스 업데이트 (일시정지 하지 않음)
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const videoIndex = Number(entry.target.getAttribute("data-index"));

        if (entry.isIntersecting) {
          // 스크롤 중이 아닐 때만 인덱스 업데이트
          if (!isScrolling) {
            onChangeIndex(getRealIndex(videoIndex));
          }

          // 비디오가 보이면 재생 - 이미 재생 중일 수도 있음
          if (entry.target instanceof HTMLVideoElement) {
            if (entry.target.paused) {
              entry.target
                .play()
                .catch((err) => console.error("비디오 재생 실패:", err));
            }
          }
        }
      });
    },
    [onChangeIndex, getRealIndex, isScrolling]
  );

  // 비디오 최초 로드 시 모두 재생
  useEffect(() => {
    // 약간의 지연 후 비디오 재생 (화면 렌더링 완료 후)
    const timer = setTimeout(() => {
      playAllVideos();
    }, 500);

    // 주기적으로 재생 상태 확인
    const interval = setInterval(playAllVideos, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [playAllVideos]);

  // 현재 인덱스 비디오가 변경될 때 자동 스크롤 (최초 1회만)
  useEffect(() => {
    // 첫 번째 비디오에 대해서만 자동 스크롤 적용
    if (!shouldAutoScroll || currentIndex !== 0) return;

    if (containerRef.current && videoRefs.current[currentIndex]) {
      const element = videoRefs.current[currentIndex];

      setIsScrolling(true); // 스크롤 시작 표시
      element.scrollIntoView({ behavior: "smooth" });

      // 스크롤 완료 후 상태 업데이트
      setTimeout(() => {
        setIsScrolling(false);
        setShouldAutoScroll(false); // 최초 1회 후 비활성화
      }, 500);
    }
  }, [currentIndex, shouldAutoScroll]);

  // 스크롤 이벤트 핸들러 - 무한 스크롤 구현
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isScrolling) return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // 스크롤이 70% 이상 진행되었는지 확인
    const scrolledDown = scrollTop + clientHeight >= scrollHeight * 0.7;

    if (scrolledDown) {
      // 스크롤 위치 저장
      const scrollPosition = scrollTop;

      // 더 많은 릴스 데이터 추가 (기존 데이터 반복)
      setReelsCount((prev) => prev + 1);

      // 약간의 지연 후 스크롤 위치 복원 (새 콘텐츠가 렌더링된 후)
      setTimeout(() => {
        if (containerRef.current) {
          // 이전 위치보다 약간 아래로 스크롤하여 새 콘텐츠 보이게 함
          containerRef.current.scrollTo({
            top: scrollPosition + 10,
            behavior: "auto",
          });
        }
      }, 100);
    }
  }, [isScrolling]);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  // IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.7, // 임계값 높임 (더 많이 보일 때 활성화)
      root: containerRef.current, // 컨테이너 기준으로 교차 감지
    });

    videoRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, repeatedReels.length]);

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/embed/")) {
      return `${url}?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&playlist=${url
        .split("/")
        .pop()}&modestbranding=1&showinfo=0&fs=0&iv_load_policy=3&disablekb=1&rel=0`;
    }

    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    } else if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("shorts/")[1];
    } else {
      return url;
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&rel=0&playlist=${videoId}&modestbranding=1&showinfo=0&fs=0&iv_load_policy=3&disablekb=1&color=white`;
  };

  return (
    <div className="w-full sm:w-[520px] h-full">
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {repeatedReels.map((reel, index) => {
          const isYouTube =
            reel.videoUrl.includes("youtube.com") ||
            reel.videoUrl.includes("youtu.be");

          return (
            <div
              key={reel.tempId} // 고유 키 사용
              className="w-full h-full relative snap-start snap-always"
            >
              {isYouTube ? (
                <div className="relative w-full h-full">
                  <iframe
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    data-index={index}
                    src={getYouTubeEmbedUrl(reel.videoUrl)}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ pointerEvents: "none", border: 0 }}
                  ></iframe>
                  {/* 투명 오버레이 추가 - 유튜브 UI와의 상호작용 방지 */}
                  <div className="absolute inset-0 z-10 w-full h-full pointer-events-none" />
                </div>
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  data-index={index}
                  src={reel.videoUrl}
                  className="w-full h-full object-cover rounded-lg"
                  loop
                  muted
                  playsInline
                  autoPlay
                ></video>
              )}

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>

              <div className="absolute bottom-16 left-4 flex flex-col gap-4 w-[85%]">
                <div className="flex items-center justify-start gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={Profile}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                    <span className="text-sm font-bold text-white">
                      {reel.username}
                    </span>
                    <span className="text-sm text-white mx-1">·</span>
                  </div>
                  <button className="border border-white rounded-md px-2 py-1">
                    <span className="text-xs font-bold text-white">팔로우</span>
                  </button>
                </div>

                <div>
                  <span className="text-sm text-white line-clamp-2">
                    {reel.caption}
                  </span>
                </div>

                <div className="w-full max-w-[300px] bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-white inline-flex items-center gap-2">
                  <span className="text-xs font-normal">↗ {reel.music}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReelsMain;
