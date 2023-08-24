'use client'

import { EpisodeData } from '@/types/episodes'
import { ReactNode, createContext, useState } from 'react'

type PlayerContextValue = {
  episodeList: EpisodeData[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
  play: (episode: EpisodeData) => void
  playList: (list: EpisodeData[], index: number) => void
  setPlayingState: (state: boolean) => void
  togglePlay: () => void
  toggleLoop: () => void
  toggleShuffle: () => void
  playNext: () => void
  playPrevious: () => void
  clearPlayerState: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export const PlayerContext = createContext({} as PlayerContextValue)

type PlayerContextProviderProps = {
  children: ReactNode
}

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState<EpisodeData[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isLooping, setIsLooping] = useState<boolean>(false)
  const [isShuffling, setIsShuffling] = useState<boolean>(false)

  function play(episode: EpisodeData): void {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: EpisodeData[], index: number): void {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay(): void {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop(): void {
    setIsLooping(!isLooping)
  }

  function toggleShuffle(): void {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean): void {
    setIsPlaying(state)
  }

  function clearPlayerState(): void {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length

  function playNext(): void {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length,
      )

      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious(): void {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        playNext,
        playPrevious,
        isPlaying,
        isLooping,
        isShuffling,
        togglePlay,
        setPlayingState,
        hasNext,
        hasPrevious,
        toggleLoop,
        toggleShuffle,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
