import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.get('/api/popular',async (req,res)=>{
    try{

        const response = await fetch (
            `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`
        )
        const data = await response.json()
          res.json(data)

    }catch(error){
        res.status(500).json({error: 'Error fetching popular movies'});
    }
});

app.get('/api/search',async (req,res)=>{
    const {query,page} = req.query;
    try{ const response = await fetch(
        `${TMDB_BASE_URL}/movie/search?api_key=${API_KEY}&query=${query}&page=${page}`)
     const data = await response.json();
    res.json(data);
    
    }catch(error){
         res.status(500).json({ error: "Error fetching movie details" })

    }});

    app.get("/api/movie/:id", async (req, res) => {

        const { id } = req.params;
        try {
          const response = await fetch(
            `${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}`
          );
          const data = await response.json();
          res.json(data);
        } catch (error) {
          res.status(500).json({ error: "Error fetching movie details" });
        }
    });

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})