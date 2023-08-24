import { PlayButton } from '@/components/PlayButton'
import { EpisodeData, EpisodeResponseData } from '@/types/episodes'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

type EpisodeProps = {
  params: {
    slug: string
  }
}

export default async function Episode({ params: { slug } }: EpisodeProps) {
  const { episode } = await fetch(`http://localhost:3333/episodes/${slug}`, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      return response.json()
    })
    .then((data: EpisodeResponseData) => {
      const episode: EpisodeData = {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.publishedAt), 'd MMM yy', {
          locale: ptBR,
        }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(
          Number(data.file.duration),
        ),
        url: data.file.url,
        type: data.file.type,
      }

      return {
        episode,
      }
    })

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button" className="flex items-center justify-center">
            <Image
              src="/arrow-left.svg"
              alt="Voltar"
              width={10}
              height={16}
              quality={100}
              style={{
                borderRadius: '1rem',
              }}
            />
          </button>
        </Link>
        <Image
          src={episode.thumbnail}
          alt="Thumbnail"
          style={{
            objectFit: 'cover',
            borderRadius: '1rem',
          }}
          fill
          priority
          sizes="100%"
          quality={100}
        />
        <PlayButton episode={episode} />
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  )
}
