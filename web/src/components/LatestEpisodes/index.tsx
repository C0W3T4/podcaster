'use client'

import { usePlayer } from '@/hooks/usePlayer'
import { EpisodeData } from '@/types/episodes'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

type LatestEpisodesProps = {
  latestEpisodes: EpisodeData[]
  allEpisodes: EpisodeData[]
}

export function LatestEpisodes({
  latestEpisodes,
  allEpisodes,
}: LatestEpisodesProps) {
  const { playList } = usePlayer()

  const episodeList = [...latestEpisodes, ...allEpisodes]

  return (
    <section className={styles.latestEpisodes}>
      <h2>Últimos lançamentos</h2>

      <ul>
        {latestEpisodes.map((episode, index) => {
          return (
            <li key={episode.id}>
              <Image
                width={120}
                height={120}
                src={episode.thumbnail}
                alt={episode.title}
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '1rem',
                }}
                quality={100}
              />

              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                  <span>{episode.title}</span>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button
                type="button"
                onClick={() => playList(episodeList, index)}
              >
                <Image
                  src="/play-green.svg"
                  alt="Tocar episódio"
                  width={40}
                  height={40}
                  quality={100}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
