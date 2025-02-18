"use client" // om jag inte hade skrivit detta hade sidan varit som 'use server'
import { fetchPokemons } from "@/actions";
import PokemonCard from "@/components/pokemon-card";
import { BasePoke } from "@/interfaces";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams(); // Hämta query-parametrar från URL
  const router = useRouter();

  const limit = searchParams.get("limit") || "20"; // standardvärde om limit saknas
  const offset = searchParams.get("offset") || "0"; // standardvärde om offset saknas
  const [pokemons, setPokemons] = useState<BasePoke[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // när offset eller limit ändras, skall vi fetcha pokemons
    const loadData = async () => {
      try {
        const params = new URLSearchParams({offset, limit});
        const data = await fetchPokemons(params.toString());
        setPokemons(data);
      } catch (err) {
        setError("Det blev något galet när vi hämtade pokemons. Försök senare.");
        console.error("Error fetching: ", err);
      }
    };

    loadData();
  }, [offset, limit]);

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = event.target.value;
    // uppdatera vår URL
    router.push(`/?offset=${offset}&limit=${newLimit}`);
  }

  // visa felet för användaren:
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Pokémons</h1>
      <select value={limit} onChange={handleLimitChange}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={151}>151</option>
      </select>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} name={pokemon.name} url={pokemon.url} id={pokemon.id} />
      ))}
    </main>
  );
}