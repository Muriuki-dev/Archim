export default async function handler(req, res) {
  const { lat, lon } = req.body || {};
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "";
  const userAgent = req.headers['user-agent'] || "";
  const time = new Date().toISOString();

  let deviceType = "Desktop";
  if (/mobile/i.test(userAgent)) deviceType = "Mobile";
  if (/tablet/i.test(userAgent)) deviceType = "Tablet";

  const data = {
    ip,
    time,
    deviceType,
    userAgent,
    latitude: lat || "",
    longitude: lon || ""
  };

  const googleScriptURL = "https://script.google.com/macros/s/AKfycbwsy74kEyZuDuYhThlAMJ-jrVn6SmalE-ucpareO0YYdhPCXgMpielh554xnDy7eneIIg/exec"; // replace with your real URL

  try {
    await fetch(googleScriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    res.status(200).json({ message: "Logged to Google Sheets", data });
  } catch (err) {
    console.error("Error sending to Google Sheets:", err);
    res.status(500).json({ error: "Failed to log visit" });
  }
}
