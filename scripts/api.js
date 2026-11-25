export async function sendRequest({ url, method }) {
  const parsedUrl = new URL(url);
  const response = await fetch(parsedUrl.href, { method });
  const rawText = await response.text();

  let json = null;
  let isValidJSON = false;

  try {
    json = JSON.parse(rawText);
    isValidJSON = true;
  } catch {
    json = null;
    isValidJSON = false;
  }

  return {
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
    rawText,
    json,
    isValidJSON,
  };
}