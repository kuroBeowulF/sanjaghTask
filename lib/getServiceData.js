export async function getServiceData(zoneId, serviceId) {
  let result;
  try {
    result = await fetch(
      `https://front-interview.darkube.app/inter/exp/direct/api/page?serviceId=${serviceId}=3&zoneId=${zoneId}`
    );
  } catch (error) {
    console.log({ error });
  }

  return result && result.json();
}
