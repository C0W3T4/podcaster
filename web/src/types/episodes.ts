interface EpisodeFile {
  url: string
  type: string
  duration: number
}

export type EpisodeResponseData = {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  description: string
  file: EpisodeFile
}

export type EpisodeData = {
  id: string
  title: string
  thumbnail: string
  members: string
  duration: number
  durationAsString: string
  url: string
  publishedAt: string
  description: string
  type: string
}
