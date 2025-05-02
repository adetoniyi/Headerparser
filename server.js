const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// Fix: Let Express trust proxies to properly extract the IP
app.set('trust proxy', true);

const PORT = process.env.PORT || 5000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html from the 'views' folder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// API endpoint
app.get("/api/whoami", (req, res) => {
  const ipaddress = req.ip;
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
