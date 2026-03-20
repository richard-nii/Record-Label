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

      {/* HERO SECTION */}
      <div className="page-hero">
        <div className="stripe"></div>
        <div className="ph-bg">ARTISTS</div>
        <div className="label-tag">Our Roster</div>
        <h1>The <em>Artists</em></h1>
        <p>
          A diverse collective of Ghanaian and West African talent — from established
          international acts to rising stars ready to take on the world.
        </p>
      </div>

      {/* ARTISTS GRID */}
      <div className="all-artists">
        <div className="label-tag">Full Roster</div>

        <div className="ag">
          {artists.map((artist, index) => (
            <div key={artist.id} className="ac">
              
              {/* Background (you can replace emoji with image later) */}
              <div className={`ac-bg bg${(index % 6) + 1}`}>
                🎤
              </div>

              <div className="ac-topbar"></div>
              <div className="ac-overlay"></div>

              <div className="ac-info">
                <div className="ac-genre">
                  {artist.genre || "Music"}
                </div>

                <div className="ac-name">
                  {artist.name}
                </div>

                <div className="ac-bio">
                  {artist.bio}
                </div>

                <div className="ac-actions">
                  <a href={`/artists/${artist.id}`} className="ac-btn">
                    Profile
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Artists;