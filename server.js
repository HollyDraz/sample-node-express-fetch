import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Enable CORS

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors()); // Allow frontend apps to fetch data from this API

//temporary storage
let games = [];

const fetchGames = async () => {
  try {
    const response = await fetch('https://api.sampleapis.com/switch/games');
    if (!response.ok) throw new Error(`Error fetching games: ${response.status}`);
    games = await response.json();
  } catch (error) {
    console.error(error);
  }
};

fetchGames(); // Fetch games on server start



// Home route
app.get('/', (req, res) => {
  res.send('Switch Games API is running.');
});


//get all games
app.get('/games', (req, res) => {
  res.json(games);
});

//get games by id
app.get('/games/:id',(req,res) => {
const {id} = req.params;
// Check if the game with the given ID exists in the temporary storage
//url is orginally a string, so we need to parse it to an int - convert string to number
const game = games.find((game) => game.id === parseInt(id));
if (!game) {
  return res.status(404).json({ error: 'Game not found' });
}
// Return the game data
res.json(game);
});


// Get all Switch games without temporary storage

// app.get('/games', async (req, res) => {
//   try {
//     const response = await fetch('https://api.sampleapis.com/switch/games');
//     if (!response.ok) throw new Error(`Error fetching games: ${response.status}`);
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });




// Get a single game by ID
// app.get('/games/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const response = await fetch(`https://api.sampleapis.com/switch/games/${id}`);
//     if (!response.ok) throw new Error(`Game not found with ID: ${id}`);
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
