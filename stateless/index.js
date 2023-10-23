import express from "express";
import animals from "./animals.js";

const MAX_ANIMALS = animals.length;

const app = express();

app.get("/animals", (req, res) => {
  console.log(req);
  console.log(`stateless GET animals request hit on port ${process.env.PORT}`);

  console.log(req.query.animalIndex);

  // fetching from animalIndex query parameter of the request
  const animalIndex = parseInt(req.query.animalIndex);

  console.log(animalIndex);

  // if animalIndex >= MAX_ANIMALS, wrap send an error response describing an invalid input
  if (animalIndex >= MAX_ANIMALS) {
    res.status(400).send("Invalid animal index");
    return;
  }

  // Slice the array of animals to return a list of 5 unique animal names.
  const animalNames = animals.slice(animalIndex, animalIndex + 5);
  res.status(200).send({ animals: animalNames, starting_index: animalIndex });
});

// environment defined port or 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
