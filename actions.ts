"use server";

import { APIData, BasePoke, IndividualBasePoke } from "./interfaces";

// hämta från pokeapi
const API_BASE = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemons(searchParams: string): Promise<BasePoke[]> {
    // göra om vår URL
    const url = new URL(API_BASE);
    url.search = searchParams; // sätter queryparametrar
    console.log(url.toString());
    
    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`Error HTTP status: ${response.status}`);
    }
    const data: APIData = await response.json();

    if (!Array.isArray(data.results)) {
        throw new Error("Invalid data format received");
    }

    // https://pokeapi.co/api/v2/pokemon/25/
    // 
    // lägga till ett ID på alla våra pokemon-objekt
    const updatedPokes: BasePoke[] = data.results.map((pokemon) => ({
        ...pokemon, // behåller befintliga attribut
        id: Number(pokemon.url.split("/").slice(-2, -1)[0])
    }));

    return updatedPokes;

}

export async function fetchPokemon(id: string) {
    const url = `${API_BASE}/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error HTTP status: ${response.status}`);
    }
    const data: IndividualBasePoke = await response.json();

    return data;
}