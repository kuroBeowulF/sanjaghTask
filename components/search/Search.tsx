"use client";
import { useEffect, useState, useCallback, memo, useRef } from "react";
import SearchItem from "./SearchItem";
import { useDebounce } from "../../lib/useDebounce";
import { useOutsideOfElement } from "./../../lib/useOutSideOfElement";

type Props = {
  zonesData: ZoneAndServiceData[];
  page: string;
  zoneId: null | string;
};
const Search = ({ zonesData, page, zoneId }: Props) => {
  const formRef = useRef();
  const [resultBoxDisplay, setResultBoxDisplay] = useState("none");
  const [inputVal, setInputVal] = useState("");
  const [filteredData, setFilteredData] = useState(zonesData);

  const debuncedVal = useDebounce(inputVal, 500);

  useOutsideOfElement(formRef, () => setResultBoxDisplay("none"));

  const setFilteredMemoData = useCallback(() => {
    setFilteredData(zonesData.filter((item) => item.name.includes(inputVal)));
  }, [debuncedVal]);

  useEffect(() => {
    setFilteredMemoData();
  }, [debuncedVal]);

  return (
    <form className="w-full flex flex-col items-center" ref={formRef}>
      <input
        type="text"
        className="min-w-[50%] max-w-xl p-3 border-slate-300 border-2 rounded-xl outline-0 mb-2 text-ellipsis whitespace-nowrap overflow-hidden"
        placeholder={
          page === "zone"
            ? "شهر مورد نظرتان را انتخاب کنید ..."
            : "سرویس مورد نظرتان را انتخاب کنید ..."
        }
        value={inputVal}
        onFocus={() => setResultBoxDisplay("block")}
        onChange={(e) => setInputVal(e.target.value)}
      ></input>
      <div
        className="min-w-[50%] max-w-xl border-slate-300 border-2 rounded-xl mx-auto p-2 m-h max-h-48 overflow-auto"
        style={{ display: resultBoxDisplay }}
      >
        <ul>
          {filteredData.map((item) => {
            return (
              <SearchItem
                key={item.id}
                id={item.id}
                name={item.name}
                zoneId={zoneId}
              />
            );
          })}
        </ul>
      </div>
    </form>
  );
};

export default memo(Search);
