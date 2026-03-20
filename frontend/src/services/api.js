const BASE_URL = "http://localhost:5000/api";

// GET all artists
export const getArtists = async () => {
  const res = await fetch(`${BASE_URL}/artists`);
  return res.json();
};

// GET single artist
export const getArtistById = async (id) => {
  const res = await fetch(`${BASE_URL}/artists/${id}`);
  return res.json();
};