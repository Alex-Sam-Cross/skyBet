# SkyBet Technical Challenge

### Technology Choices

I have decided to build the app with React, run the tests with Jest and use Webpack for module bundling. 
The reason I chose React is because I'm confident building apps with JavaScript and React and I enjoy using the component-based UI. 
I used Jest for testing.

### What I would add/improve with more time

I spent three evenings (approx 8/9 hours) on this test and tried to prioritise certain tasks over others. 
I could focus on my code therefore I would've liked to have done the following if I had more time:

- Implement full SASS styling
- Utilise WebSocket responses to update the UI - Sockets where open and subscriptions to all events on homepage had been made but nothing is being done with them currently 
- Fix a small props Validation error to enable toggleOdds Button to fire toggleOddsDisplay functionn in app.js
- Fix a small bug with the ingame time, currently showing NaN 
- Include loading spinners for during ajax requests - for the loading of the details page
- Add more than one unit test.


### How to run the app

Please make sure to have Node v6 or higher and Docker installed and running:

1) Install dependencies:

```javascript
npm install
```

2) Spin up the Docker container:

```javascript
docker-compose up
```

3) Start the app (in a separate terminal window), Navigate to localhost:9090 in the browser if it fails to open automatically:

```javascript
npm start
```
5) To run the unit test:

```javascript
npm test
```
