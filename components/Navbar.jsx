import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-center sm:justify-end items-center flex-col   p-4 bg-slate-600 sticky top-0 drop-shadow-xl">
      <h1 className="text-xl font-bold text-white">
        <Link href="/">سنجاق</Link>
      </h1>
    </nav>
  );
}
