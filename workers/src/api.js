async function query(event, x) {
  let req = event.request;

  if (req.method != "POST") {
    throw Error("method not allowed");
  }

  let body = await req.json();

  let subreq = new Request(
    "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/" +
      x.appid +
      "?verbose=true&timezoneOffset=-360&subscription-key=" +
      x.subkey +
      "&q=" +
      encodeURIComponent(body.question),
    {
      headers: {
        Accept: "application/json"
      }
    }
  );

  let cache = await caches.open("calculator");
  let resp = await cache.match(subreq);

  if (!resp) {
    resp = await fetch(subreq);
    event.waitUntil(cache.put(subreq, resp.clone()));
  }

  let result = await resp.json();
  let intent = result.topScoringIntent;
  if (intent.intent === "None" || intent.score < 0.5) {
    return { result: "KO" };
  }

  let values = [];
  const facts = body.facts.forEach(v => {
    values.push(Number(v.split(" ")[0]));
  });
  if (intent.intent === "Sum") {
    let sum = 0;
    values.forEach(n => {
      sum += n;
    });
    return { result: sum };
  } else {
    //difference
    if (values.length <= 1) {
      return { result: "?" };
    }
    let diff = values[0] - values[1];
    return { result: diff };
  }
}

export default async function handleAPIRequest(event) {
  // use azure cognitive services
  const response = await query(event, {
    appid: "18acb634-b6f7-4ff2-bbab-ceb98f53bcf2",
    subkey: "VALID-KEY"
  });
  return new Response(JSON.stringify(response));
}
