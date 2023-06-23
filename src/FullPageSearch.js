import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import Link from "next/link";

const ZonePicker = ({ zoneName, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center py-3 pr-3 pl-5 border-gray-200 border border-r-0 rounded-l-lg sm:rounded-none sm:border-l-0 h-12 cursor-pointer"
    >
      <HiOutlineLocationMarker className="ml-1" size="1.4rem" color="#D3D4D5" />
      <span className="text-gray-800 select-none whitespace-nowrap">
        {zoneName ? zoneName : "انتخاب شهر"}
      </span>
    </div>
  );
};

const SearchItem = ({ zoneId, serviceId, serviceName }) => {
  return (
    <div className="border-b border-b-[#F5F5F5]">
      <Link href={`${serviceId}/${zoneId}`} className="text-black">
        <li className="p-3 cursor-pointer hover:bg-[#E5F1FF] list-none">
          {" "}
          {serviceName}{" "}
        </li>
      </Link>
    </div>
  );
};

const SearchResults = ({ results, zoneId }) => {
  return (
    <div className="bg-white overflow-auto z-10 mt-12 top-0 max-h-72 absolute w-full border border-[#EAECED] rounded-b-md shadow-sm scrollbar-minimal">
      {results.map(({ id, name }) => (
        <SearchItem
          key={id}
          zoneId={zoneId}
          serviceId={id}
          serviceName={name}
        />
      ))}
    </div>
  );
};

const SearchInput = ({ serviceList, setServiceList }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSearchInputChange = (e) => setInputValue(e.currentTarget.value);

  let handleClearClick = (_) => {
    setInputValue("");
    setServiceList([]);
  };

  useEffect(() => {
    let trimmedValue = inputValue.trim();

    setServiceList((_) => {
      if (trimmedValue === "") {
        return serviceList;
      } else {
        return serviceList.filter((s) => s.name.includes(trimmedValue));
      }
    });
  }, [inputValue]);

  return (
    <div className="flex w-full">
      <div className="flex justify-between items-center w-full relative overflow-hidden">
        <input
          type="search"
          className="absolute outline-none text-gray-700 w-full"
          value={inputValue}
          onChange={handleSearchInputChange}
          placeholder="به چه خدمتی نیاز دارید؟"
        />
      </div>
      <span className="z-10" onClick={handleClearClick}>
        <CgClose className="cursor-pointer" size="1.4rem" color="#D3D4D5" />
      </span>
    </div>
  );
};

const SearchHeader = ({ searchType, onBackButtonClick }) => {
  const setHeaderText = () => {
    switch (searchType) {
      case "ServiceSearch": {
        return "جستجوی خدمت";
      }

      case "CitySearch": {
        return "جستجوی شهر";
      }

      case "CLOSED":
        return "";
    }
  };

  return (
    <div className="relative flex items-center justify-center py-6 sm:max-w-xl mx-auto">
      <button className="absolute right-2" onClick={onBackButtonClick}>
        <FaAngleRight size="22" />
      </button>
      <p className="font-bold text-lg"> {setHeaderText()} </p>
    </div>
  );
};

export const FullPageWrapper = ({
  onBackButtonClick,
  children,
  searchType,
}) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-white z-[99999] cursor-default">
      <SearchHeader
        onBackButtonClick={onBackButtonClick}
        searchType={searchType}
      />
      <div className="px-3"> {children} </div>
    </div>
  );
};

const ServiceSearch = ({ zoneName, zoneId, searchType, setSearchType }) => {
  const [serviceList, setServiceList] = useState([]);
  const [filterdServiceList, setFilteredServiceList] = useState([]);

  useEffect(() => {
    fetch(`/api/services?zoneId=${zoneId}`)
      .then((res) => res.json())
      .then((serviceList) => {
        setServiceList(serviceList);
        setFilteredServiceList(serviceList);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <FullPageWrapper
      onBackButtonClick={() => setSearchType("CLOSED")}
      searchType={searchType}
    >
      <div className="relative flex items-center w-full sm:max-w-xl shadow-sm rounded-md mx-auto">
        <div className="flex flex-col justify-center w-full relative">
          <div className="flex items-center p-3 border-gray-200 border rounded-lg rounded-l-none border-l-0 h-12">
            <SearchInput
              serviceList={serviceList}
              setServiceList={setFilteredServiceList}
            />
          </div>
          <span className="absolute left-0 self-center h-9 w-0 border-r-[1px] border-gray-200" />
        </div>
        <ZonePicker
          zoneName={zoneName}
          onClick={() => setSearchType("CitySearch")}
        />
        <SearchResults results={filterdServiceList} zoneId={zoneId} />
      </div>
    </FullPageWrapper>
  );
};

const StaticSearchInput = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full overflow-hidden items-center p-3 border-gray-200 border rounded-lg h-12"
    >
      <FiSearch className="ml-1 xsm:ml-2" size="1.4rem" color="#D3D4D5" />
      <span className="text-ellipsis whitespace-nowrap overflow-hidden text-gray-400">
        جستجوی خدمات در شهرها...
      </span>
    </button>
  );
};

const City = ({ zoneId, zoneName, setCurrentZone, setSearchType }) => {
  const handleCitySelect = () => {
    setCurrentZone({ zoneId, zoneName });
    setSearchType("ServiceSearch");
  };

  return (
    <div
      onClick={handleCitySelect}
      className="border-b border-b-gray-100 text-gray-500 py-3 px-2 cursor-pointer hover:bg-[#E5F1FF]"
    >
      <span> {zoneName} </span>
    </div>
  );
};

const CitySearch = ({ searchType, setSearchType, setCurrentZone }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredZoneList, setFilteredZoneList] = useState([]);
  const [zoneList, setZoneList] = useState([]);

  const handleInputChange = (e) => {
    let value = e.currentTarget.value;
    let trimmedValue = value.trim();

    setFilteredZoneList((_) => {
      if (trimmedValue === "") {
        return zoneList;
      } else {
        return zoneList.filter((z) => z.name.includes(trimmedValue));
      }
    });

    setInputValue((_) => value);
  };

  useEffect(() => {
    fetch("/api/zones")
      .then((res) => res.json())
      .then((zoneList) => {
        setZoneList(zoneList);
        setFilteredZoneList(zoneList);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <FullPageWrapper
      onBackButtonClick={() => setSearchType("ServiceSearch")}
      searchType={searchType}
    >
      <div className="flex items-center border rounded-lg border-gray-200 p-3 sm:max-w-xl mx-auto">
        <HiOutlineLocationMarker
          className="ml-1 xsm:ml-2"
          size="1.2rem"
          color="#D3D4D5"
        />
        <input
          type="text"
          className="outline-none text-gray-700"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="جستجوی شهر"
        />
      </div>
      <div className="overflow-auto mt-3 max-h-[750px] scrollbar-minimal sm:max-w-xl mx-auto">
        {filteredZoneList.map(({ id, name }) => (
          <City
            key={id}
            zoneId={id}
            zoneName={name}
            setCurrentZone={setCurrentZone}
            setSearchType={setSearchType}
          />
        ))}
      </div>
    </FullPageWrapper>
  );
};

const FullPageSearch = ({
  containerClassName,
  zoneName,
  zoneId,
  setCurrentZone,
}) => {
  let [searchType, setSearchType] = useState("CLOSED");

  return (
    <div className={containerClassName}>
      <StaticSearchInput onClick={(_) => setSearchType("ServiceSearch")} />
      {(() => {
        switch (searchType) {
          case "ServiceSearch":
            return (
              <ServiceSearch
                zoneName={zoneName}
                zoneId={zoneId}
                searchType={searchType}
                setSearchType={setSearchType}
              />
            );

          case "CitySearch":
            return (
              <CitySearch
                setCurrentZone={setCurrentZone}
                setSearchType={setSearchType}
                searchType={searchType}
              />
            );

          case "CLOSED":
            return <></>;
        }
      })()}
    </div>
  );
};

export default FullPageSearch;
