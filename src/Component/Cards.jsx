import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Cards.module.css";

export const Cards = ({url}) => {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        
        axios
            .get(url) 
            .then((response) => {
                setPokemon(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Pokémon data:", error);
            });
            console.log(url)
    }, [url]);

    if (pokemon) {
       
    }

    if (!pokemon) {
        return <div>Loading...</div>; 
    }

    return (
        <div className={styles.Cards}>
            
            <div className={styles.name}>{pokemon.name.toUpperCase()}</div>

            
            <div className={styles.image}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>

            
            <div className={styles.types}>
                <h3>{pokemon.types[0].type['name']} Pokemon</h3>
            </div>
            <div className={styles.info}>
                <div>
                    
                    <div className={styles.abilities}>
                        <h4>Pokemon Power:</h4>
                        <ul>
                            {pokemon.abilities.map((abilityInfo) => (
                                <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.dimensions}>
                        <h3>Height and Weight:</h3>
                        <p>Height: {pokemon.height / 10} m</p>
                        <p>Weight: {pokemon.weight / 10} kg</p>
                    </div>
                </div>

                
                <div className={styles.stats}>
                    <h3>Base Stats:</h3>
                    <ul>
                        {pokemon.stats.map((statInfo) => (
                            <li key={statInfo.stat.name}>
                                {statInfo.stat.name.toUpperCase()}: {statInfo.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>

                

            </div>
        </div>
    );
};
