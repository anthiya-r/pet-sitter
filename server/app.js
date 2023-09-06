import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import sitterCardData from "./data/SitterCardData.js";
import sitterDetailRouter from "./routers/sittterDetail.js";
import dotenv from "dotenv";

async function init() {
  const app = express();
  const port = 4000;
  dotenv.config();

  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/sitter", sitterDetailRouter);

  app.get("/search", (req, res) => {
    // let keywords = req.query.keywords;

    // if (keywords === undefined) {
    //   return res.status(400).json({
    //     message: "Please send keywords parameter in the URL endpoint",
    //   });
    // }

    // const regexKeywords = keywords.split(" ").join("|");
    // const regex = new RegExp(regexKeywords, "ig");
    // const results = card.filter((card) => {
    //   return (
    //     card.trade_name.match(regex) ||
    //     card.pets.match(regex) ||
    //     card.tags.filter((tag) => tag.match(regex)).length
    //   );
    // });

    return res.json({
      data: sitterCardData,
    });
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  // authRouter under this line cannot use .GET ******************
  app.use("/auth", authRouter);
}

init();
