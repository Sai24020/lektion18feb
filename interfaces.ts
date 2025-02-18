export interface APIData {
    count: number,
    next: string | null,
    previous: string | null,
    results: PokeFromApi[]
}

export interface PokeFromApi {
    name: string;
    url: string;
}

export interface BasePoke {
    name: string;
    url: string;
    id: number;
}

export interface IndividualBasePoke {
    name: string;
    id: number;
    base_experience: number;
    sprites: PokemonSprites;
}

interface PokemonSprites {
    back_default: string;
    front_default: string;
    front_shiny: string;
}