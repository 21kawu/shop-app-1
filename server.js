const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_KEY);

app.post("/api/send", async (req, res) => {
  const { items } = req.body;

  try {
    await resend.emails.send({
      from: "Walentynki <onboarding@resend.dev>",
      to: ["rekkibass@gmail.com"],
      subject: "Nowe zamówienie ❤️",
      html: `<h2>Wybrane rzeczy:</h2><p>${items}</p>`,
    });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Mail error" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
