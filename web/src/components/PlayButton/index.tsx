'use client'

import { usePlayer } from '@/hooks/usePlayer'
import { EpisodeData } from '@/types/episodes'
import Image from 'next/image'

type PlayButtonProps = {
  episode: EpisodeData
}

export const PlayButton = ({ episode }: PlayButtonProps) => {
  const { play } = usePlayer()

  return (
    <button type="button" onClick={() => play(episode)}>
      <Image
        src="/play.svg"
        alt="Tocar episódio"
        width={32}
        height={32}
        quality={100}
      />
    </button>
  )
}
