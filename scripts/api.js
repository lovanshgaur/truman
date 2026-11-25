export async function sendRequest({ url, method, params = [], headers = [], body = "" }) {
  const parsedUrl = new URL(url);

  params.forEach(([key, value]) => {
    parsedUrl.searchParams.append(key, value);
  });

  const requestHeaders = new Headers();
  headers.forEach(([key, value]) => {
    requestHeaders.append(key, value);
  });

  const options = {
    method,
    headers: requestHeaders,
  };

  if (method !== "GET" && body.trim() !== "") {
    try {
      JSON.parse(body);
    } catch {
      throw new Error("Invalid JSON in request body.");
    }
    options.body = body;
  }

  const startTime = performance.now();
  const response = await fetch(parsedUrl.href, options);
  const duration = Math.round(performance.now() - startTime);
  const rawText = await response.text();
  const size = new TextEncoder().encode(rawText).length;

  let json = null;
  let isValidJSON = false;

  try {
    json = JSON.parse(rawText);
    isValidJSON = true;
  } catch {
    json = null;
    isValidJSON = false;
  }

  const responseHeaders = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  return {
    finalUrl: parsedUrl.href,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
    duration,
    size,
    headers: responseHeaders,
    rawText,
    json,
    isValidJSON,
  };
}