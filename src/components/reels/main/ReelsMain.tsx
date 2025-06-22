import { useRef, useEffect, useCallback, useState } from "react";
import Profile from "@/assets/simbol/default.png";
import { mockReels } from "../../../data/reelsData";
import type { Dispatch, SetStateAction } from "react";
// 사운드 아이콘 임포트
import VolumeUp from "@/assets/simbol/volume_up.svg";
import VolumeOff from "@/assets/simbol/volume_off.svg";

interface ReelsMainProps {
  currentIndex: number;
  onChangeIndex: Dispatch<SetStateAction<number>>;
}

// 비디오 참조를 관리하기 위한 타입 정의
interface VideoRefInfo {
  element: HTMLVideoElement | HTMLIFrameElement | null;
  isMuted: boolean;
  isYoutube: boolean;
  isPlaying: boolean; // 재생 상태 추가
  soundIconRef?: HTMLImageElement | null;
}

const ReelsMain = ({ currentIndex, onChangeIndex }: ReelsMainProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 비디오 참조를 객체로 관리
  const videoRefs = useRef<Record<string, VideoRefInfo>>({});

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

  // 비디오 요소 참조 설정 함수
  const setVideoRef = useCallback(
    (
      el: HTMLVideoElement | HTMLIFrameElement | null,
      reelId: string,
      isYoutube: boolean
    ) => {
      if (el) {
        // ref 객체에 정보 저장 (기존 정보 유지)
        const existingInfo = videoRefs.current[reelId];
        videoRefs.current[reelId] = {
          ...existingInfo,
          element: el,
          isMuted: true, // 기본값은 음소거
          isYoutube,
          isPlaying: true, // 기본값은 재생 중
        };

        // 비디오 요소면 muted 속성 설정
        if (!isYoutube && el instanceof HTMLVideoElement) {
          el.muted = true;
        }
      }
    },
    []
  );

  // 사운드 아이콘 참조 설정 함수
  const setSoundIconRef = useCallback(
    (el: HTMLImageElement | null, reelId: string) => {
      if (el) {
        // 기존 정보 유지하면서 아이콘 참조 추가
        const existingInfo = videoRefs.current[reelId] || {
          element: null,
          isMuted: true,
          isYoutube: false,
          isPlaying: true,
        };

        videoRefs.current[reelId] = {
          ...existingInfo,
          soundIconRef: el,
        };

        // 초기 아이콘 설정
        el.src = VolumeOff;
        el.alt = "소리 켜기";
      }
    },
    []
  );

  // 사운드 토글 함수 - 완전한 DOM 직접 조작
  const toggleSound = useCallback((reelId: string) => {
    const videoInfo = videoRefs.current[reelId];
    if (!videoInfo || !videoInfo.element || !videoInfo.soundIconRef) return;

    // 현재 음소거 상태의 반대값
    const newMutedState = !videoInfo.isMuted;

    // 1. ref 객체에 상태 업데이트
    videoRefs.current[reelId].isMuted = newMutedState;

    // 2. 실제 DOM 요소 업데이트
    if (videoInfo.isYoutube) {
      // YouTube iframe의 경우 postMessage API 사용
      try {
        const iframe = videoInfo.element as HTMLIFrameElement;
        const message = {
          event: "command",
          func: newMutedState ? "mute" : "unMute",
        };
        iframe.contentWindow?.postMessage(JSON.stringify(message), "*");
      } catch (_) {
        // 에러 무시
        console.error("YouTube iframe 메시지 전송 실패", _);
      }
    } else {
      // 일반 비디오 요소의 경우
      const videoElement = videoInfo.element as HTMLVideoElement;
      videoElement.muted = newMutedState;
    }

    // 3. 사운드 아이콘 DOM 업데이트 (React 상태 사용 안함)
    const iconElement = videoInfo.soundIconRef;
    if (iconElement) {
      if (newMutedState) {
        iconElement.src = VolumeOff;
        iconElement.alt = "소리 켜기";
      } else {
        iconElement.src = VolumeUp;
        iconElement.alt = "소리 끄기";
      }
    }
  }, []);

  // 비디오 재생/일시정지 토글 함수 추가
  const togglePlayPause = useCallback((reelId: string) => {
    const videoInfo = videoRefs.current[reelId];
    if (!videoInfo || !videoInfo.element) return;

    // 현재 재생 상태의 반대값
    const newPlayingState = !videoInfo.isPlaying;

    // 1. ref 객체에 상태 업데이트
    videoRefs.current[reelId].isPlaying = newPlayingState;

    // 2. 실제 DOM 요소 업데이트
    if (videoInfo.isYoutube) {
      // YouTube iframe의 경우 postMessage API 사용
      try {
        const iframe = videoInfo.element as HTMLIFrameElement;
        const message = {
          event: "command",
          func: newPlayingState ? "playVideo" : "pauseVideo",
        };
        iframe.contentWindow?.postMessage(JSON.stringify(message), "*");
      } catch (_) {
        console.error("YouTube iframe 메시지 전송 실패", _);
      }
    } else {
      // 일반 비디오 요소의 경우
      const videoElement = videoInfo.element as HTMLVideoElement;
      if (newPlayingState) {
        videoElement
          .play()
          .catch((err) => console.error("비디오 재생 실패:", err));
      } else {
        videoElement.pause();
      }
    }
  }, []);

  // 실제 인덱스 계산 (반복 처리)
  const getRealIndex = useCallback(
    (index: number) => index % mockReels.length,
    []
  );

  // 모든 비디오를 재생 상태로 유지하는 함수
  const playAllVideos = useCallback(() => {
    Object.values(videoRefs.current).forEach((videoInfo) => {
      if (
        !videoInfo.isYoutube &&
        videoInfo.element instanceof HTMLVideoElement &&
        videoInfo.isPlaying // 현재 재생 상태인 비디오만 재생
      ) {
        if (videoInfo.element.paused) {
          videoInfo.element
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
        const reelId = entry.target.getAttribute("data-reel-id");
        const videoIndex = Number(entry.target.getAttribute("data-index"));

        if (entry.isIntersecting && reelId) {
          // 스크롤 중이 아닐 때만 인덱스 업데이트
          if (!isScrolling) {
            onChangeIndex(getRealIndex(videoIndex));
          }

          // 비디오가 보이면 재생 - 이미 재생 중일 수도 있음
          const videoInfo = videoRefs.current[reelId];
          if (
            videoInfo &&
            !videoInfo.isYoutube &&
            videoInfo.element instanceof HTMLVideoElement &&
            videoInfo.isPlaying // 현재 재생 상태인 비디오만 재생
          ) {
            if (videoInfo.element.paused) {
              videoInfo.element
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

  // YouTube 플레이어 준비 메시지 리스너
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "onReady") {
          // YouTube 플레이어가 준비되면 필요한 처리
          console.log("YouTube player ready");
        }
      } catch (_) {
        // JSON 파싱 실패는 무시
        console.error("메시지 파싱 실패:", _);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

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
      // 스크롤 시작 상태로 설정
      setIsScrolling(true);

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
        // 스크롤 종료 상태로 설정
        setIsScrolling(false);
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

    // 모든 비디오 요소 관찰
    document.querySelectorAll("[data-reel-id]").forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, repeatedReels.length]);

  // 현재 인덱스에 해당하는 비디오로 자동 스크롤
  useEffect(() => {
    // shouldAutoScroll이 true이고, 현재 스크롤 중이 아닐 때만 실행
    if (shouldAutoScroll && !isScrolling) {
      const targetReelId = repeatedReels.find(
        (_, idx) => idx === currentIndex
      )?.tempId;

      if (targetReelId) {
        const targetVideoInfo = videoRefs.current[targetReelId];
        if (targetVideoInfo && targetVideoInfo.element) {
          // 해당 요소로 스크롤
          targetVideoInfo.element.scrollIntoView({ behavior: "smooth" });

          // 자동 스크롤 비활성화
          setShouldAutoScroll(false);
        }
      }
    }
  }, [currentIndex, shouldAutoScroll, isScrolling, repeatedReels]);

  // YouTube 임베드 URL 생성 - 음소거 상태는 postMessage로 컨트롤하므로 여기서는 항상 mute=1
  const getYouTubeEmbedUrl = (url: string) => {
    // YouTube iframe API 활성화 파라미터 추가
    const apiParam = "&enablejsapi=1";

    if (url.includes("youtube.com/embed/")) {
      const baseUrl = `${url}?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&playlist=${url
        .split("/")
        .pop()}&modestbranding=1&showinfo=0&fs=0&iv_load_policy=3&disablekb=1&rel=0`;
      return baseUrl + apiParam;
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

    const baseUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&rel=0&playlist=${videoId}&modestbranding=1&showinfo=0&fs=0&iv_load_policy=3&disablekb=1&color=white`;
    return baseUrl + apiParam;
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
              key={reel.tempId}
              className="w-full h-full relative snap-start snap-always"
            >
              {/* 비디오 컨테이너에 클릭 이벤트 핸들러 추가 */}
              <div
                className="relative w-full h-full cursor-pointer"
                onClick={() => togglePlayPause(reel.tempId)}
              >
                {isYouTube ? (
                  <>
                    <iframe
                      ref={(el) => setVideoRef(el, reel.tempId, true)}
                      data-index={index}
                      data-reel-id={reel.tempId}
                      src={getYouTubeEmbedUrl(reel.videoUrl)}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ pointerEvents: "none", border: 0 }}
                    ></iframe>
                    {/* 투명 오버레이 - 이벤트 전파를 위해 pointer-events 제거 */}
                    <div className="absolute inset-0 z-10 w-full h-full" />
                  </>
                ) : (
                  <video
                    ref={(el) => setVideoRef(el, reel.tempId, false)}
                    data-index={index}
                    data-reel-id={reel.tempId}
                    src={reel.videoUrl}
                    className="w-full h-full object-cover rounded-lg"
                    loop
                    playsInline
                    autoPlay
                  ></video>
                )}
              </div>

              {/* 사운드 컨트롤 버튼 - 이벤트 전파 방지 */}
              <div
                className="absolute top-4 right-4 z-20 cursor-pointer bg-black/30 rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSound(reel.tempId);
                }}
              >
                <img
                  ref={(el) => setSoundIconRef(el, reel.tempId)}
                  src={VolumeOff} // 초기 상태는 항상 음소거
                  alt="소리 켜기"
                  className="w-6 h-6 brightness-0 invert"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* 비디오 정보 영역 - 이벤트 전파 방지 */}
              <div
                className="absolute bottom-4 left-4 flex flex-col gap-4 w-[85%]"
                onClick={(e) => e.stopPropagation()}
              >
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
