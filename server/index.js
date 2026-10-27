import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ImageKit from "@imagekit/nodejs";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

const imagekit = new ImageKit({
  privatekey: process.env.IMAGEKIT_PRIVATE_KEY,
});

app.get("/auth", (req, res) => {
  const authenticationParaMeters =
    imagekit.helper.getAuthenticationParameters();

  res.json(authenticationParaMeters);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is running on port ${PORT}`);
});
