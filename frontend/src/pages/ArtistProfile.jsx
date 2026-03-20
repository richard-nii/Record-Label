import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtistById } from "../services/api";
import Loader from "../components/Loader";

function ArtistProfile() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtistById(id)
      .then(data => {
        setArtist(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!artist) return <p>Artist not found</p>;

  return (
    <div>
      <h1>{artist.name}</h1>

      <img
        src={artist.image}
        alt={artist.name}
        className="w-96"
      />

      <p>{artist.bio}</p>
    </div>
  );
}

export default ArtistProfile;