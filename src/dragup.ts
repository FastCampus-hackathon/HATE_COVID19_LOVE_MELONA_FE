import { useRef, useEffect } from "react";

export const MIN_Y = 300;
export const MAX_Y = window.innerHeight - 100;

interface DragEvent {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: "none" | "down" | "up";
  };
}

function useBottomSheet() {
  const sheet = useRef<HTMLDivElement>(null);
  const metrics = useRef<DragEvent>({
    touchStart: {
      sheetY: 0,
      touchY: 0
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none"
    }
  });

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;

      touchStart.sheetY = sheet.current.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = "down";
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = "up";
      }

      const touchOffset = currentTouch.clientY - touchStart.touchY;
      let nextSheetY = touchStart.sheetY + touchOffset;

      if (nextSheetY <= MIN_Y) {
        nextSheetY = MIN_Y;
      }

      if (nextSheetY >= MAX_Y) {
        nextSheetY = MAX_Y;
      }

      sheet.current.style.setProperty(
        "transeform",
        `translateY(${nextSheetY - MAX_Y}px)`
      );
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const { touchMove } = metrics.current;

      const currentSheetY = sheet.current.getBoundingClientRect().y;

      if (currentSheetY !== MIN_Y) {
        if (touchMove.movingDirection === "down") {
          sheet.current.style.setProperty("transform", "translateY(0)");
        }

        if (touchMove.movingDirection === "up") {
          sheet.current.style.setProperty(
            "transform",
            `translateY(${MIN_Y - MAX_Y}px)`
          );
        }
      }

      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: "none"
        }
      };
    };

    sheet.current.addEventListener("touchstart", handleTouchStart);
    sheet.current.addEventListener("touchmove", handleTouchMove);
    sheet.current.addEventListener("touchend", handleTouchEnd);

    return () => {
      sheet.current.addEventListener("touchstart", handleTouchStart);
      sheet.current.addEventListener("touchmove", handleTouchMove);
      sheet.current.addEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return { sheet };
}

export default useBottomSheet;
