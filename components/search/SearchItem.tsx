"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";

type Props = {
  id: string;
  name: string;
  zoneId: null | string;
};

const SearchItem = ({ name, id, zoneId }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (zoneId) {
      router.push(`${zoneId}/${id}/`);
    } else {
      router.push(`/${id}/`);
    }
  };
  return (
    <li
      className="w-full mt-2 cursor-pointer hover:text-orange-400"
      onClick={handleClick}
    >
      {name}
    </li>
  );
};
export default memo(SearchItem);
