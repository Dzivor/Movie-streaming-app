import banner1 from "@/assets/banner_1.png";
import banner2 from "@/assets/banner_2.png";
import type { Movie } from "../types/movie.types";

// Mock data for trending movies
export const trendingMovies: Movie[] = [
  {
    id: 1,
    title: "Spiderman: No Way Home",
    description:
      "In the multiverse of madness, Spider-Man battles villains from alternate universes",
    releaseYear: 2021,
    durationMinutes: 148,
    thumbnail: banner1,
    views: 5420,
    categories: ["Fantasy", "Action", "Adventure"],
  },
  {
    id: 2,
    title: "The Dark Knight",
    description:
      "Batman faces his greatest foe yet - the Joker, who plunges Gotham into chaos",
    releaseYear: 2008,
    durationMinutes: 152,
    thumbnail: banner2,
    views: 8750,
    categories: ["Action", "Crime", "Drama"],
  },
  {
    id: 3,
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology",
    releaseYear: 2010,
    durationMinutes: 148,
    thumbnail: banner1,
    views: 6200,
    categories: ["Sci-Fi", "Thriller", "Action"],
  },
  {
    id: 4,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space",
    releaseYear: 2014,
    durationMinutes: 169,
    thumbnail: banner2,
    views: 7100,
    categories: ["Sci-Fi", "Drama", "Adventure"],
  },
  {
    id: 5,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over years, finding redemption",
    releaseYear: 1994,
    durationMinutes: 142,
    thumbnail: banner1,
    views: 9800,
    categories: ["Drama"],
  },
];

// Mock data for popular action movies
export const actionMovies: Movie[] = [
  {
    id: 6,
    title: "John Wick",
    description:
      "An ex-hitman comes out of retirement to track down the gangsters",
    releaseYear: 2014,
    durationMinutes: 101,
    thumbnail: banner2,
    views: 4500,
    categories: ["Action", "Thriller"],
  },
  {
    id: 7,
    title: "Mad Max: Fury Road",
    description:
      "In a post-apocalyptic wasteland, a woman rebels against a tyrant",
    releaseYear: 2015,
    durationMinutes: 120,
    thumbnail: banner1,
    views: 5300,
    categories: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 8,
    title: "Mission Impossible",
    description:
      "Ethan Hunt and his team tackle their most impossible mission yet",
    releaseYear: 2018,
    durationMinutes: 147,
    thumbnail: banner2,
    views: 6100,
    categories: ["Action", "Thriller", "Adventure"],
  },
  {
    id: 9,
    title: "The Matrix",
    description:
      "A computer hacker learns about the true nature of his reality",
    releaseYear: 1999,
    durationMinutes: 136,
    thumbnail: banner1,
    views: 8200,
    categories: ["Action", "Sci-Fi"],
  },
  {
    id: 10,
    title: "Gladiator",
    description:
      "A betrayed Roman general seeks revenge against the corrupt emperor",
    releaseYear: 2000,
    durationMinutes: 155,
    thumbnail: banner2,
    views: 7400,
    categories: ["Action", "Drama", "Adventure"],
  },
];

// Mock data for sci-fi movies
export const sciFiMovies: Movie[] = [
  {
    id: 11,
    title: "Blade Runner 2049",
    description:
      "A young blade runner discovers a secret that could plunge society into chaos",
    releaseYear: 2017,
    durationMinutes: 164,
    thumbnail: banner1,
    views: 4200,
    categories: ["Sci-Fi", "Thriller", "Drama"],
  },
  {
    id: 12,
    title: "Arrival",
    description:
      "A linguist works with the military to communicate with alien lifeforms",
    releaseYear: 2016,
    durationMinutes: 116,
    thumbnail: banner2,
    views: 5100,
    categories: ["Sci-Fi", "Drama"],
  },
  {
    id: 13,
    title: "Dune",
    description:
      "A noble family becomes embroiled in a war for control of the galaxy's most valuable asset",
    releaseYear: 2021,
    durationMinutes: 155,
    thumbnail: banner1,
    views: 6800,
    categories: ["Sci-Fi", "Adventure", "Drama"],
  },
  {
    id: 14,
    title: "Ex Machina",
    description:
      "A programmer is invited to administer the Turing test to an intelligent humanoid robot",
    releaseYear: 2014,
    durationMinutes: 108,
    thumbnail: banner2,
    views: 3900,
    categories: ["Sci-Fi", "Thriller"],
  },
  {
    id: 15,
    title: "The Martian",
    description: "An astronaut becomes stranded on Mars and must survive",
    releaseYear: 2015,
    durationMinutes: 144,
    thumbnail: banner1,
    views: 7600,
    categories: ["Sci-Fi", "Adventure", "Drama"],
  },
];

// Mock data for drama movies
export const dramaMovies: Movie[] = [
  {
    id: 16,
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control to his reluctant son",
    releaseYear: 1972,
    durationMinutes: 175,
    thumbnail: banner2,
    views: 10200,
    categories: ["Drama", "Crime"],
  },
  {
    id: 17,
    title: "Forrest Gump",
    description:
      "The life story of a simple man with low IQ who accomplishes great things",
    releaseYear: 1994,
    durationMinutes: 142,
    thumbnail: banner1,
    views: 9100,
    categories: ["Drama", "Romance"],
  },
  {
    id: 18,
    title: "Schindler's List",
    description:
      "In German-occupied Poland, industrialist Oskar Schindler saves lives",
    releaseYear: 1993,
    durationMinutes: 195,
    thumbnail: banner2,
    views: 8500,
    categories: ["Drama", "History"],
  },
  {
    id: 19,
    title: "The Pianist",
    description:
      "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto",
    releaseYear: 2002,
    durationMinutes: 150,
    thumbnail: banner1,
    views: 6700,
    categories: ["Drama", "War"],
  },
  {
    id: 20,
    title: "A Beautiful Mind",
    description:
      "A brilliant but asocial mathematician accepts secret work in cryptography",
    releaseYear: 2001,
    durationMinutes: 135,
    thumbnail: banner2,
    views: 5800,
    categories: ["Drama", "Biography"],
  },
];

// Mock data for comedy movies
export const comedyMovies: Movie[] = [
  {
    id: 21,
    title: "The Grand Budapest Hotel",
    description:
      "A concierge and his protégé become involved in a theft and murder",
    releaseYear: 2014,
    durationMinutes: 99,
    thumbnail: banner1,
    views: 5500,
    categories: ["Comedy", "Adventure"],
  },
  {
    id: 22,
    title: "Superbad",
    description:
      "Two co-dependent high school seniors are forced to deal with separation anxiety",
    releaseYear: 2007,
    durationMinutes: 113,
    thumbnail: banner2,
    views: 6300,
    categories: ["Comedy"],
  },
  {
    id: 23,
    title: "The Hangover",
    description:
      "Three friends wake up from a bachelor party with no memory of the night before",
    releaseYear: 2009,
    durationMinutes: 100,
    thumbnail: banner1,
    views: 7200,
    categories: ["Comedy"],
  },
  {
    id: 24,
    title: "Deadpool",
    description:
      "A wisecracking mercenary gets experimented on and becomes immortal",
    releaseYear: 2016,
    durationMinutes: 108,
    thumbnail: banner2,
    views: 8400,
    categories: ["Comedy", "Action"],
  },
  {
    id: 25,
    title: "Guardians of the Galaxy",
    description:
      "A group of intergalactic criminals must pull together to stop a fanatical warrior",
    releaseYear: 2014,
    durationMinutes: 121,
    thumbnail: banner1,
    views: 9200,
    categories: ["Comedy", "Action", "Adventure"],
  },
];

// Mock data for new releases
export const newReleases: Movie[] = [
  {
    id: 26,
    title: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in developing the atomic bomb",
    releaseYear: 2023,
    durationMinutes: 180,
    thumbnail: banner2,
    views: 3200,
    categories: ["Drama", "Biography", "History"],
  },
  {
    id: 27,
    title: "Barbie",
    description:
      "Barbie and Ken are having the time of their lives in the colorful world of Barbie Land",
    releaseYear: 2023,
    durationMinutes: 114,
    thumbnail: banner1,
    views: 4100,
    categories: ["Comedy", "Adventure", "Fantasy"],
  },
  {
    id: 28,
    title: "The Batman",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham",
    releaseYear: 2022,
    durationMinutes: 176,
    thumbnail: banner2,
    views: 5900,
    categories: ["Action", "Crime", "Drama"],
  },
  {
    id: 29,
    title: "Everything Everywhere All at Once",
    description:
      "An aging Chinese immigrant is swept up in an insane adventure",
    releaseYear: 2022,
    durationMinutes: 139,
    thumbnail: banner1,
    views: 4800,
    categories: ["Action", "Adventure", "Comedy"],
  },
  {
    id: 30,
    title: "Top Gun: Maverick",
    description:
      "After thirty years, Maverick is still pushing the envelope as a top naval aviator",
    releaseYear: 2022,
    durationMinutes: 130,
    thumbnail: banner2,
    views: 7300,
    categories: ["Action", "Drama"],
  },
];
