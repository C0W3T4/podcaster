'use client'

import { usePlayer } from '@/hooks/usePlayer'
import { EpisodeData } from '@/types/episodes'
import Image from 'next/image'
import styles from './styles.module.scss'

type PlayButtonProps = {
  episode: EpisodeData
}

export const PlayButton = ({ episode }: PlayButtonProps) => {
  const { play } = usePlayer()

  return (
    <button
      type="button"
      className={styles.playButton}
      onClick={() => play(episode)}
    >
      <Image
        src="/play.svg"
        alt="Play episode"
        width={48}
        height={48}
        quality={100}
      />
    </button>
  )
}
