const LL2_BASE_URL = 'https://ll.thespacedevs.com/2.3.0';

function resolveEndpoint(requestUrl) {
  const url = new URL(requestUrl);
  const pathname = decodeURIComponent(url.pathname);
  const apiPrefix = '/api/ll2/';
  const functionPrefix = '/.netlify/functions/ll2-proxy/';

  if (pathname.startsWith(apiPrefix)) return pathname.slice(apiPrefix.length);
  if (pathname.startsWith(functionPrefix)) return pathname.slice(functionPrefix.length);
  return '';
}

function cachePolicy(endpoint) {
  if (endpoint === 'launches/upcoming/' || endpoint === 'launches/previous/' ||
      /^launches\/[^/]+\/$/.test(endpoint)) {
    return 'public, durable, max-age=900, stale-while-revalidate=300';
  }

  if (endpoint === 'launcher_configurations/' ||
      /^launcher_configurations\/\d+\/$/.test(endpoint) ||
      /^pads\/\d+\/$/.test(endpoint)) {
    return 'public, durable, max-age=86400, stale-while-revalidate=3600';
  }

  return null;
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export default async (request) => {
  if (request.method !== 'GET') {
    return jsonError('Only GET requests are supported.', 405);
  }

  const endpoint = resolveEndpoint(request.url);
  const policy = cachePolicy(endpoint);
  if (!policy) {
    return jsonError('The requested Launch Library 2 endpoint is not allowed.', 404);
  }

  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(endpoint, LL2_BASE_URL + '/');
  incomingUrl.searchParams.forEach((value, key) => upstreamUrl.searchParams.append(key, value));

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(12000),
    });

    const body = await upstream.text();
    const headers = new Headers({
      'Content-Type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    });

    if (!upstream.ok) {
      return new Response(body, { status: upstream.status, headers });
    }

    headers.set('Netlify-CDN-Cache-Control', policy);
    return new Response(body, { status: upstream.status, headers });
  } catch {
    return jsonError('Launch Library 2 is temporarily unavailable. Please try again later.', 502);
  }
};
