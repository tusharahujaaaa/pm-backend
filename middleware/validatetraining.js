module.exports = (req, res, next) => {
  const { mode, url, location } = req.body;

  if (mode === "online" && !url) {
    return res.status(400).json({ message: "URL is required for online mode" });
  }

  if (mode === "offline" && !location) {
    return res
      .status(400)
      .json({ message: "Location is required for offline mode" });
  }

  next();
};
    