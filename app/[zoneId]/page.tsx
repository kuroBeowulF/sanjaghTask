import React from "react";
import { getServicesData, getZonesData } from "../../lib/apiRequests";
import Search from "../../components/search/Search";

type Props = {
  params: {
    zoneId: string;
  };
};
export async function generateMetadata({ params: { zoneId } }: Props) {
  const services: Promise<ZoneAndServiceData[]> = getServicesData(zoneId);
  const data = await services;

  if (!data)
    return {
      title: "سرویس مورد نظر یافت نشد",
    };

  return {
    title: "انتخاب سرویس",
    description: "نتیجه سرچ سرویس در شهر مورد نظر",
  };
}

export async function generateStaticParams() {
  const zones: Promise<ZoneAndServiceData[]> = getZonesData();
  const data = await zones;

  return data.map((item) => {
    id: item.id;
  });
}

export default async function selectService({ params: { zoneId } }: Props) {
  const services: Promise<ZoneAndServiceData[]> = getServicesData(zoneId);
  const data = await services;

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="m-4 mt-10 text-center font-bold">
        میتوانید خدمات مختلف را در شهر مورد نظر خود جستجو کنید
      </h1>
      <Search
        zonesData={data}
        page={"service"}
        key={"search"}
        zoneId={zoneId}
      />
    </main>
  );
}
