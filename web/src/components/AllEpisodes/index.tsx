'use client'

import { usePlayer } from '@/hooks/usePlayer'
import { EpisodeData } from '@/types/episodes'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

type AllEpisodesProps = {
  latestEpisodes: EpisodeData[]
  allEpisodes: EpisodeData[]
}

export function AllEpisodes({ latestEpisodes, allEpisodes }: AllEpisodesProps) {
  const { playList } = usePlayer()

  const episodeList = [...latestEpisodes, ...allEpisodes]

  return (
    <section className={styles.allEpisodes}>
      <h2>Todos episódios</h2>
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allEpisodes.map((episode, index) => {
            return (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    style={{
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                    }}
                    quality={100}
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <span>{episode.title}</span>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      playList(episodeList, index + latestEpisodes.length)
                    }
                  >
                    <Image
                      src="/play-green.svg"
                      alt="Tocar episódio"
                      width={40}
                      height={40}
                      quality={100}
                    />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
