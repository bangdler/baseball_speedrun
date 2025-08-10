"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const HistoryPage = () => {
  const [input, setInput] = useState("");
  const [hasInputFilled, setHasInputFilled] = useState(false);
  const router = useRouter();
  const pushLengthRef = useRef(0);

  useEffect(() => {
    const preventGoBack = () => {
      if (pushLengthRef.current === 0) {
        return;
      }

      if (confirm("정말 뒤로 가시겠습니까?")) {
        history.back();
      } else {
        history.pushState(null, "", location.href);
      }
    };

    if (hasInputFilled && pushLengthRef.current === 0) {
      pushLengthRef.current = 1;
      history.pushState(null, "", location.href);
    } else if (!hasInputFilled && pushLengthRef.current === 1) {
      pushLengthRef.current = 0;
      history.back();
    }

    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, [hasInputFilled]);

  //   useEffect(() => {
  //     const preventGoBack = () => {
  //       console.log("popstate");
  //       if (!hasInputFilled) {
  //         return;
  //       }

  //       if (!confirm("정말 뒤로 가시겠습니까?")) {
  //         // 취소 시 현재 페이지로 다시 push
  //         console.log("push2");
  //         // history.pushState(null, "", location.href);
  //       } else {
  //         history.back();
  //       }
  //     };

  //     console.log("add");
  //     window.addEventListener("popstate", preventGoBack);

  //     return () => {
  //       window.removeEventListener("popstate", preventGoBack);
  //     };
  //   }, [hasInputFilled]);

  //   useEffect(() => {
  //     console.log("push when render");
  //     history.pushState(null, "", location.href);
  //   }, []);

  return (
    <div className="flex flex-col gap-4">
      <input
        className="border px-3 py-2 rounded w-full max-w-[160px]"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setHasInputFilled((prev) => !prev)}
      >
        확인
      </button>
      <p>hasInputFilled {hasInputFilled ? "true" : "false"}</p>
      <button onClick={() => router.push("/")}>route to main</button>
    </div>
  );
};

export default HistoryPage;
