export const GENRES = [
  "Classic Literature",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Non-Fiction",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Technology",
  "Health",
  "Travel",
  "Poetry",
  "Drama",
  "Horror",
  "Adventure",
  "Young Adult",
  "Children's",
] as const

export const RATING_OPTIONS = [
  { value: 0, label: "Not rated" },
  { value: 1, label: "1 star" },
  { value: 2, label: "2 stars" },
  { value: 3, label: "3 stars" },
  { value: 4, label: "4 stars" },
  { value: 5, label: "5 stars" },
] as const

export const CURRENT_YEAR = new Date().getFullYear()
