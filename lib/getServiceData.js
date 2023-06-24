//  we can use { cache: "force-cache" } or { cache: "no-store" } or { next: { revalidate:6000 } } for secound param of fetch
//  force-cache : default => it cache every thing after built
//  no-store : every request will do th hydration again => ssr
//  next: { revalidate:6000 } : its Isr => its mean you can build a static page and revalidate in in every some times

export async function getServiceData(zoneId, serviceId) {
  let result;
  try {
    result = await fetch(
      `https://front-interview.darkube.app/inter/exp/direct/api/page?serviceId=${serviceId}=3&zoneId=${zoneId}`,
      { cache: "force-cache" }
    );
  } catch (error) {
    console.log({ error });
  }

  return result && result.json();
}
