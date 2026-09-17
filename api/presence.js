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
  }
}
