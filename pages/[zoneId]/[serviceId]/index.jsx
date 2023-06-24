import ServiceItems from "@/components/ServiceItems";
import { getServiceData } from "@/lib/getServiceData";
import { useRouter } from "next/router";

export function generateMetadata() {
  const router = useRouter();
  const { zoneId, serviceId } = router.query;
  const services = getServiceData(zoneId, serviceId);

  if (!services)
    return {
      title: "سرویس مورد نظر یافت نشد",
    };

  return {
    title: services.title || "تایتل",
    description: "نتیجه سرچ سرویس",
  };
}

// turn ssr to ssg if we could have every service data in a request api
// export function generateStaticParams() {
//   const services = getAllTheServices();
//   return services.map((user) => {
//     servicId: services.servicId.toString();
//     zoneId: services.zoneId.toString();
//   });
// }

export default function ServicePage() {
  const router = useRouter();
  const { zoneId, serviceId } = router.query;
  const services = getServiceData(zoneId, serviceId);
  console.log({ services });

  return (
    <main className="flex flex-col items-center">
      <h1 className="font-bold text-xl mt-4">سرویس های انتخابی شما :</h1>
      <section>
        {/* {services.map((service) => {
          return <ServiceItems key={service.id} service={service} />;
        })} */}
      </section>
    </main>
  );
}
