import { fetchPokemon } from '@/actions';
import Link from 'next/link';
import React from 'react'

export default async function PokemonPage(
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    console.log(id);
    const pokemon = await fetchPokemon(id);
    console.log(pokemon);
    
    return (
        <main>
            <Link href={"/"}>🚀</Link>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} /> 
        </main>
    )
}