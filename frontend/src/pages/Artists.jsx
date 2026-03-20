import { useEffect, useState } from "react";
import { getArtists } from "../services/api";
import ArtistCard from "../components/ArtistCard";
import Loader from "../components/Loader";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getArtists()
      .then(data => {
        setArtists(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load artists");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Artists</h1>

      <div className="grid grid-cols-3 gap-4">
        {artists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default Artists;