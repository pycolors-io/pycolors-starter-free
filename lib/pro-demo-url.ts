// App-owned URL contract: these apps also ship independently of the monorepo.
export function proDemoUrl(destination = "/dashboard") {
  const configured = process.env.NEXT_PUBLIC_STARTER_PRO_DEMO_URL;
  if (!configured) return null;
  try {
    const url = new URL(configured);
    const local = ["localhost", "127.0.0.1"].includes(url.hostname);
    if (
      (url.protocol !== "https:" && !(url.protocol === "http:" && local)) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      !["/", "/demo"].includes(url.pathname)
    )
      return null;
    const match = ["/projects", "/admin", "/settings", "/billing"].find(
      (path) => destination === path || destination.startsWith(`${path}/`),
    );
    url.pathname = "/demo";
    url.searchParams.set("destination", match || "/dashboard");
    return url.toString();
  } catch {
    return null;
  }
}
