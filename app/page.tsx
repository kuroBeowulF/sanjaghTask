import Search from "../components/search/Search";
import { getZonesData } from "../lib/apiRequests";

export default async function Home() {
  const zones: Promise<ZoneAndServiceData[]> = getZonesData();
  const data = await zones;
  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="m-4 mt-10 text-center font-bold">
        میتوانید شهر مورد نظر خود را برای جستجوی خدمات انتخاب کنید
      </h1>
      <Search zonesData={data} page={"zone"} key={"zone"} zoneId={null} />
    </main>
  );
}
