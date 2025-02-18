import Link from "next/link";

type PokemonCardProps = {
    name: string;
    url: string;
    id: number;
}

export default function PokemonCard({name, url, id}: PokemonCardProps) {
  return (
    <Link href={`/${id}`}>
        <h3>{name}, ID:{id}</h3>
    </Link>
  )
}