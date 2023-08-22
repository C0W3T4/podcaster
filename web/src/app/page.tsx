import { AllEpisodes } from '@/components/AllEpisodes'
import { LatestEpisodes } from '@/components/LatestEpisodes'
import { EpisodeData, EpisodeResponseData } from '@/types/episodes'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import styles from './styles.module.scss'

export default async function Home() {
  const { allEpisodes, latestEpisodes } = await fetch(
    'http://localhost:3333/episodes',
    {
      next: {
        revalidate: 60 * 60 * 8,
      },
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      return response.json()
    })
    .then((data: EpisodeResponseData[]) => {
      const episodes: EpisodeData[] = data.map((episode) => ({
        id: episode.id,
        title: episode.title,
        description: episode.description,
        thumbnail: episode.thumbnail,
        members: episode.members,
        publishedAt: format(parseISO(episode.publishedAt), 'd MMM yy', {
          locale: ptBR,
        }),
        duration: Number(episode.file.duration),
        durationAsString: convertDurationToTimeString(
          Number(episode.file.duration),
        ),
        url: episode.file.url,
        type: episode.file.type,
      }))

      const latestEpisodes = episodes.slice(0, 2)
      const allEpisodes = episodes.slice(2, episodes.length)

      return {
        latestEpisodes,
        allEpisodes,
      }
    })

  return (
    <div className={styles.homepage}>
      <LatestEpisodes
        latestEpisodes={latestEpisodes}
        allEpisodes={allEpisodes}
      />
      <AllEpisodes latestEpisodes={latestEpisodes} allEpisodes={allEpisodes} />
    </div>
  )
}
