import RedisStore from "connect-redis";
import express from "express";
import session from "express-session";
import { createClient } from "redis";
import animals from "./animals.js";

const MAX_ANIMALS = animals.length;

// Example referenced from connect-redis npm pacakge page
// [https://www.npmjs.com/package/connect-redis?activeTab=readme]
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

// Endpoint defining a route that returns a list of 5 unique animal names.
app.get("/animals", (req, res) => {
  console.log(`GET animals request hit on port ${process.env.PORT}`);
  let index = req.session.index || 0;
  const endIndex = index + 5 > MAX_ANIMALS ? MAX_ANIMALS : index + 5;

  // Slice the array of animals to return a list of 5 unique animal names.
  // If the end index is greater than the length of the array, wrap around
  // to the beginning of the array.
  const animalNames = animals.slice(index, endIndex);
  req.session.index = endIndex >= MAX_ANIMALS ? 0 : endIndex;
  res.status(200).json({ animals: animalNames, starting_index: index });
});


// environment defined port or 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
