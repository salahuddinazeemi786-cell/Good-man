const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h1>Good-man CI/CD App</h1>
    <p>Application deployed successfully using Jenkins Pipeline.</p>
    <p>Server IP: 192.168.109.129</p>
    <p>Version: 1.0</p>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    message: "App is running fine"
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
