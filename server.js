const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h2>Dear Ahsaan, GitHub, Jenkins CI/CD pipeline has been completed with auto-deployment by Jenkins.</h2>

    <h1>Good-man CI/CD Project</h1>

    <p><strong>Application URL:</strong></p>
    <p>http://192.168.109.129:3001</p>

    <p><strong>Health Check URL:</strong></p>
    <p>http://192.168.109.129:3001/health</p>

    <p><strong>GitHub Repository:</strong></p>
    <p>https://github.com/salahuddinazeemi786-cell/Good-man</p>

    <p><strong>Jenkins URL:</strong></p>
    <p>http://192.168.109.129:8081</p>

    <p><strong>Pipeline Job:</strong></p>
    <p>good-man-pipeline</p>

    <p><strong>Deployment Status:</strong> Successfully deployed using Jenkins CI/CD pipeline.</p>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    message: "App is running fine",
    deployment: "Auto deployed by Jenkins CI/CD pipeline"
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
