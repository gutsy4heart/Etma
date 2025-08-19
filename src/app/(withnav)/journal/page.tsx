import Link from "next/link";

async function getCharacters() {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const data = await response.json();
  return data.results;
}

async function CharacterCard({character}: any) {
  const statusColor = character.status === 'Alive' ? 'bg-green-500' : 
  character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500';
  return(
    <Link href={`/journal/${character.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
       <div className="relative">
          <img src={character.image} alt={character.name} className="w-full h-48 object-cover" />
          <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${statusColor}`} />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{character.name}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Status:</span> {character.status}</p>
            <p><span className="font-medium">Species:</span> {character.species}</p>
            <p><span className="font-medium">Origin:</span> {character.origin.name}</p>
          </div>
        </div>
      
      </div>
    </Link>
  );
}


async function CharactersList() {
  const characters = await getCharacters();
  return(
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {characters.map((character: any) => (
      <CharacterCard key={character.id} character={character} />
    ))}
   </div>
  );
}

export default function Journal() {
 return(
 <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Rick and Morty Characters</h1>
      <CharactersList />
    </div>

 </div> );
}

