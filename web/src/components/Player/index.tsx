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

  function setupProgressListener() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0

      audioRef.current.addEventListener('timeupdate', () =>
        setProgress(Math.floor(audioRef?.current?.currentTime ?? 0)),
      )
    }
  }

  function handleSeek(amount: number | number[]) {
    if (audioRef.current && typeof amount === 'number') {
      audioRef.current.currentTime = amount
      setProgress(amount)
    }
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  const episode = episodeList[currentEpisodeIndex]

  return (
    <div className={styles.playerContainer}>
      <header>
        <Image
          width={32}
          height={32}
          src="/playing.svg"
          alt="Tocando agora"
          quality={100}
        />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            alt="Thumbnail"
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
          <strong>Selecione um podcast para ouvir</strong>
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
              alt="Embaralhar"
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
              alt="Tocar anterior"
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
                alt="Tocar episódio"
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
              alt="Tocar próxima"
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
              alt="Repetir"
              quality={100}
            />
          </button>
        </div>
      </footer>
    </div>
  )
}
