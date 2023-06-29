type Props = {
  serviceData: ServiceData;
};
export default function ServiceItems({ serviceData }: Props) {
  return (
    <main className="flex flex-col">
      <h2 className="font-bold text-xl mt-5">{`${serviceData.serviceId} در ${serviceData.zoneId}`}</h2>
      <h3 className="font-bold text-xl mt-5">{serviceData.text}</h3>
    </main>
  );
}
