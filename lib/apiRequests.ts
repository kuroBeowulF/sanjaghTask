export async function getZonesData() {
  const result = await fetch(
    "https://front-interview.darkube.app/inter/exp/direct/api/zones",
    { next: { revalidate: 18000 } }
  );

  return result.json();
}

export async function getServicesData(zoneId: string) {
  const result = await fetch(
    `https://front-interview.darkube.app/inter/exp/direct/api/services?zoneId=${zoneId}`,
    { next: { revalidate: 18000 } }
  );

  return result.json();
}

export async function getServicePageData(zoneId: string, serviceId: string) {
  const result = await fetch(
    `https://front-interview.darkube.app/inter/exp/direct/api/page?serviceId=${serviceId}&zoneId=${zoneId}`,
    { next: { revalidate: 18000 } }
  );

  return result.json();
}
