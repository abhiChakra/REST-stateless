import RedisStore from "connect-redis";
import express from "express";
import session from "express-session";
import { createClient } from "redis";
import animals from "./animals.js";

// Initialize client.
let redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

let app = express();

// Initialize sesssion storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "keyboard cat",
  })
);

app.get("/animals", (req, res) => {
  let index = req.session.index || 0;
  const endIndex = index + 5;
  const animalNames = animals.slice(index, endIndex);
  req.session.index = endIndex;
  res.json({"animals" : animalNames, "starting_index" : index});
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
