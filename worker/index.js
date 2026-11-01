// Serves the static snapshot in site/ for abwriting.net (Hugo build published on Netlify in 2021).
// Keeps the previous host's behaviour: www redirects to the apex, folders get a permanent trailing-slash redirect.
const HSTS = "max-age=31536000";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      return new Response(null, { status: 301, headers: { Location: url.toString(), "Strict-Transport-Security": HSTS } });
    }
    let res = await env.ASSETS.fetch(request);
    if (res.status === 307 || res.status === 308) {
      res = new Response(null, { status: 301, headers: { Location: res.headers.get("Location") } });
    } else {
      res = new Response(res.body, res);
      if (!res.headers.has("Cache-Control")) res.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    }
    res.headers.set("Strict-Transport-Security", HSTS);
    return res;
  },
};
