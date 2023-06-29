import ServiceItems from "../../../components/ServiceItems";
import { getServicePageData, getServicesData } from "../../../lib/apiRequests";
import { notFound } from "next/navigation";

type Props = {
  params: {
    serviceId: string;
    zoneId: string;
  };
};

export async function generateMetadata({
  params: { serviceId, zoneId },
}: Props) {
  const services: Promise<ServiceData> = getServicePageData(zoneId, serviceId);
  const data = await services;

  if (!data.text)
    return {
      title: "سرویس مورد نظر یافت نشد",
    };

  return {
    title: `${data.serviceId} در ${data.zoneId}`,
    description: "نتیجه سرچ سرویس",
  };
}

export async function generateStaticParams({ params: { zoneId } }: Props) {
  const zones: Promise<ZoneAndServiceData[]> = getServicesData(zoneId);
  const data = await zones;

  return data.map((item) => {
    id: item.id;
  });
}

export default async function ServicePage({
  params: { serviceId, zoneId },
}: Props) {
  const services: Promise<ServiceData> = getServicePageData(zoneId, serviceId);
  const data = await services;
  if (!data.text) return notFound;
  return (
    <main className="flex flex-col items-center">
      <h1 className="font-bold text-xl mt-4">سرویس انتخابی شما :</h1>
      <section>
        <ServiceItems serviceData={data} />
      </section>
      <p className="text-green-400 mt-5 p-2 text-center">
        برای برگشت به صفحه اول بر روی شنجاق در هدر سایت کلیک کنید
      </p>
    </main>
  );
}
