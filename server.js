const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/send", async (req, res) => {
  const { items } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rekkibass@gmail.com",
        pass: "ndfmquyetmcefenx",
      },
    });

    await transporter.sendMail({
      from: "rekkibass@gmail.com",
      to: "rekkibass@gmail.com",
      subject: "Nowe zamówienie",
      text: `Wybrane produkty: ${items}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Błąd wysyłania" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Serwer działa na porcie " + PORT);
});

