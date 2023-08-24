'use client'

import { usePlayer } from '@/hooks/usePlayer'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState<number>(0)

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState,
  } = usePlayer()

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  function setupProgressListener(): void {
    if (audioRef.current) {
      audioRef.current.currentTime = 0

      audioRef.current.addEventListener('timeupdate', () =>
        setProgress(Math.floor(audioRef?.current?.currentTime ?? 0)),
      )
    }
  }

  function handleSeek(amount: number | number[]): void {
    if (audioRef.current) {
      if (typeof amount === 'number') {
        audioRef.current.currentTime = amount
        setProgress(amount)
      } else if (Array.isArray(amount)) {
        audioRef.current.currentTime = amount[0]
        setProgress(amount[0])
      }
    }
  }

  function handleEpisodeEnded(): void {
    hasNext ? playNext() : clearPlayerState()
  }

  const episode = episodeList[currentEpisodeIndex]

  return (
    <div className={styles.playerContainer}>
      <header>
        <Image
          width={32}
          height={32}
          src="/playing.svg"
          alt="Playing now"
          quality={100}
        />
        <strong>Playing now</strong>
      </header>
      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={364}
            height={364}
            src={episode.thumbnail}
            alt={episode.title || 'Thumbnail'}
            style={{
              aspectRatio: '1/1',
              objectFit: 'cover',
              borderRadius: '1.5rem',
            }}
            quality={100}
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Select a podcast to listen to</strong>
        </div>
      )}
      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>
        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay
            onEnded={handleEpisodeEnded}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        )}
        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
          >
            <Image
              width={24}
              height={24}
              src="/shuffle.svg"
              alt="Shuffle"
              quality={100}
            />
          </button>
          <button
            type="button"
            onClick={playPrevious}
            disabled={!episode || !hasPrevious}
          >
            <Image
              width={24}
              height={24}
              src="/play-previous.svg"
              alt="Play previous"
              quality={100}
            />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Image
                width={16}
                height={16}
                src="/pause.svg"
                alt="Pause"
                quality={100}
                style={{
                  aspectRatio: '1/1',
                }}
              />
            ) : (
              <Image
                width={32}
                height={32}
                src="/play.svg"
                alt="Play episode"
                quality={100}
                style={{
                  aspectRatio: '1/1',
                }}
              />
            )}
          </button>
          <button
            type="button"
            onClick={playNext}
            disabled={!episode || !hasNext}
          >
            <Image
              width={24}
              height={24}
              src="/play-next.svg"
              alt="Play next"
              quality={100}
            />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}
          >
            <Image
              width={24}
              height={24}
              src="/repeat.svg"
              alt="Repeat"
              quality={100}
            />
          </button>
        </div>
      </footer>
    </div>
  )
}
