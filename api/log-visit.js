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

  const googleScriptURL = "https://script.google.com/macros/s/AKfycbwtiJw0doJ3ZwBpkRnQ3aiMvpga1yFGWbH6JzpU8K3payX5ENebS-pwbCpMJimbEuslyg/exec"; // replace with your actual link

  await fetch(googleScriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });

  res.status(200).json({ message: "Logged to Google Sheets" });
}

