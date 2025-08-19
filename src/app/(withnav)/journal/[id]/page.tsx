import Link from "next/link";

async function getCharacter(id: string) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch character");
  }
  return response.json();
}

async function getEpisodes(episodeUrls: string[]) {
  if (!episodeUrls || episodeUrls.length === 0) return [];
  const ids = episodeUrls.map((u) => u.split("/").pop()).filter(Boolean).join(",");
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${ids}`);
  if (!response.ok) {
    throw new Error("Failed to fetch episodes");
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const character = await getCharacter(params.id);
  const episodes = await getEpisodes(character.episode);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/journal" className="text-blue-600 hover:underline">← Back</Link>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
          <img src={character.image} alt={character.name} className="w-full h-auto object-cover" />
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{character.name}</h1>
            <p className="text-gray-600"><span className="font-medium">Status:</span> {character.status}</p>
            <p className="text-gray-600"><span className="font-medium">Species:</span> {character.species}</p>
            <p className="text-gray-600"><span className="font-medium">Gender:</span> {character.gender}</p>
            <p className="text-gray-600"><span className="font-medium">Origin:</span> {character.origin?.name}</p>
            <p className="text-gray-600"><span className="font-medium">Location:</span> {character.location?.name}</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Episodes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {episodes.map((ep: any) => (
              <div key={ep.id} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold">{ep.episode}: {ep.name}</h3>
                <p className="text-gray-600">Air date: {ep.air_date}</p>
              </div>
            ))}
            {episodes.length === 0 && (
              <div className="text-gray-600">No episodes found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


