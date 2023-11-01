import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: "dbs5aijk3",
  api_key: "358713798329685",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POSTS
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//CREATE A POST
router.route("/").post(async (req, res) => {
  try {
    const { name, photo, prompt } = req.body;

    cloudinary.uploader.upload(
      photo,
      { public_id: prompt },
      async function (error, result) {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
        } else {
          console.log("Uploaded to Cloudinary:", result);
          const publicURL = result.secure_url; // Get the public URL
          console.log("Public URL:");

          const newPost = await Post.create({
            name,
            prompt,
            photo: publicURL,
          });

          res.status(201).json({ success: true, data: newPost });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
