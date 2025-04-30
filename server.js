const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API route
app.get("/api/whoami", (req, res) => {
  const ipaddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];

  res.json({
    ipaddress,
    language,
    software
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
