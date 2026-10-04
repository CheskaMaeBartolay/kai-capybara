<<<<<<< HEAD
export default async function handler(request, response) {
  const userId = Number(new URL(request.url, `https://${request.headers.host}`).searchParams.get("userId")) || 8685718614;

  try {
    const robloxResponse = await fetch("https://presence.roblox.com/v1/presence/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIds: [userId] })
    });

    const data = await robloxResponse.json();
    return response.status(robloxResponse.status).json(data);
  } catch {
    return response.status(500).json({ error: "Unable to retrieve Roblox presence" });
=======
export default async function handler(req, res) {
  const userId = Number(req.query.userId || 8685718614);

  if (!Number.isInteger(userId)) {
    return res.status(400).json({
      error: "Invalid Roblox user ID"
    });
  }

  try {
    const robloxResponse = await fetch(
      "https://presence.roblox.com/v1/presence/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          userIds: [userId]
        })
      }
    );

    const data = await robloxResponse.json();

    return res.status(robloxResponse.status).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to load Roblox presence"
    });
>>>>>>> e0ffc37f498f6ce8aa69efc0053dda2630473b34
  }
}
