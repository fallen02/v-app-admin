export interface LoginUserType {
  email: string
  password: string
}

interface titleType {
  romanji: string
  english: string
}

interface coverImageType {
  medium: string
  large: string
  extraLarge: string
  color: string | null
}
interface episodesType {
  fldId: number
  [epiNo: number]: episodeType
}
interface episodeType {
  title: string
  link: string
  fileId: number
}

export interface animeTypes {
  anilistId: string
  title: titleType
  description: string
  bannerImage: string
  coverImage: coverImageType
  totalEpisoses: number
  episodes?: episodesType
}

