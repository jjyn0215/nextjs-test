"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AutoRefresh({ interval = 30 }: { interval?: number }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      router.refresh(); // 페이지 데이터 갱신
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [interval, router]);

  return null; // 화면에 아무것도 렌더링하지 않음
}
