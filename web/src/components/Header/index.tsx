import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Podcastr"
          width={163}
          height={40}
          quality={100}
        />
      </Link>
      <p>The best for you to listen to, always! 🎶</p>
      <span>{currentDate}</span>
    </header>
  )
}
