# REST-stateless-stateless
Supplementary code accompanying article describing the details of a stateful and stateless REST interaction
The artcile on Dev.to can be found here: [Explained with example - What is API statelessness and why do we care?](https://dev.to/abhichakra/explained-with-code-example-what-is-api-statelessness-and-why-do-we-care-4hm5-temp-slug-4939909?preview=8d5e0702e98df37b31e73714a3f9464e3696148753e8dfc241d05187d72fe1687b04b7a6f16f4218e10ad5a447b4524433a598c66a6396bc82b72632)

This repo is broken into a Stateful and Stateless section. Here are the details of each of those sections:

## Stateful
### Here are the steps to recreate and run the project: 
1. From the `./stateful` directory run `npm install`
2. Run either on default port 3000 via `node index.js` or define the port `PORT=3001 node index.js`

### Layout
![Stateful API interaction setup](https://github.com/abhiChakra/REST-stateless-stateful/assets/42390963/274f04d1-8779-426b-8184-1b08ac4ce082)

As seen in the diagram, for my implementation, I leveraged [Postman](https://www.postman.com/) to 'mimic a frontend' HTTP request. I implemented user sessions via the [`express-session`](https://www.npmjs.com/package/express-session) NPM package, while using a local (literally on my computer) Redis instance to store this user session state, specifically utilizing the [`redis`](https://www.npmjs.com/package/redis) and [`connect-redis`](https://www.npmjs.com/package/connect-redis) NPM packages. As for the animal names themselves...I saved myself the trouble: I asked chatGPT to produce 42 unique animal names and stored it as an exported JS array.


## Stateless
### Here are the steps to recreate and run the project: 
1. From the `./stateless` directory run `npm install`
2. Run either on default port 3000 via `node index.js` or define the port `PORT=3002 node index.js`

### Layout
![image](https://github.com/abhiChakra/REST-stateless-stateful/assets/42390963/793ae20e-5d84-48ad-a2c1-44be45d89b6e)

In this implementation, the client itself (say a simple react app) will handle the current `index` state on the client side (i.e. the frontend)! It will then pass this information to the server via url query params, which the server will then utilize to guide its response. 
Here’s the HTTP endpoint layout for this request: `/fetchAnimals/?index=5`
As the client will handle the state, the servers are free to be multiplied for horizontal scaling without any fear about state sync.
