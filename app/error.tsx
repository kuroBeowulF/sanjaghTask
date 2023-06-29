"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-1/2 h-48 mt-5 p-2 mx-auto rounded-xl bg-slate-200 flex flex-col items-center">
      <h2 className="text-orange-800 font-serif text-2xl">
        مشکلی پیش آمده است !!
      </h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="p-3 bg-orange-400 rounded-xl mt-4 text-white hover:text-orange-400 hover:bg-white"
      >
        تلاش مجدد
      </button>

      <h2 className="text-xl mt-4">
        برای برگشت به
        <Link href="/" className="font-bold text-green-500">
          {" "}
          صفحه اصلی کلیک
        </Link>{" "}
        کنید
      </h2>
    </div>
  );
}
