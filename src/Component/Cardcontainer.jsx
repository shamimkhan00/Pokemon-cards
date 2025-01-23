import styles from "./Cardcontainer.module.css"
import { useState, useEffect } from "react";
import { Cards } from "./Cards"
import axios from "axios";

// https://pokeapi.co/api/v2/pokemon

export const Cardcontainer = () => {

  const [ALLpokemon, setALLPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPokemon, setFilterPokemon] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        setALLPokemon(response.data.results);
        setFilterPokemon(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }, []);


  const searchOnChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={searchOnChange}
          style={{
            padding: "10px",
            width: "600px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>
      <div className={styles.Cardcontainer}>
        {ALLpokemon
          .filter((poke)=>{
            return search.toLowerCase() === '' ? poke : poke.name.toLowerCase().includes(search);
          })
          .map((poke, index) => (
            <Cards key={index} url={poke.url} />
            
          ))}
      </div>
    </div>
  );
}

// (poke) => poke.name.toLowerCase().includes(search.toLowerCase())