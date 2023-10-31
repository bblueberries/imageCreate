import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E");
});

export default router;
