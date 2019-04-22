import handleAPIRequest from "./api";

export async function handleRequest(event) {
  let u = new URL(event.request.url);
  switch (u.pathname) {
    case "/":
      return new Response(JSON.stringify({ result: "0" }));
    case "/solve":
      return await handleAPIRequest(event);
    default:
      return new Response(JSON.stringify({ result: "" }));
  }
}
