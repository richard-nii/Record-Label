import { Link } from "react-router-dom";

function ArtistCard({ artist }) {
  return (
    <div className="bg-gray-800 p-4 rounded">
      <img
        src={artist.image}
        alt={artist.name}
        className="w-full h-48 object-cover"
      />

      <h2 className="text-xl mt-2">{artist.name}</h2>

      <Link
        to={`/artists/${artist.id}`}
        className="text-yellow-400"
      >
        View Profile
      </Link>
    </div>
  );
}

export default ArtistCard;