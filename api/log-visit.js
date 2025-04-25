export default async function handler(req, res) {
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
  };

  // Replace this with your actual Google Apps Script endpoint
  const googleScriptURL = "https://script.google.com/macros/s/AKfycbzehpeKd2F8QvYktWChwYr718oF8AsIVgv0sXbqKtdYC9INLpKvabQLG2BYCxcIC5CjWA/exec";

  await fetch(googleScriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });

  res.status(200).json({ message: "Logged to Google Sheets" });
}
