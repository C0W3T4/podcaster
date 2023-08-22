'use client'

import { PlayerContext } from '@/contexts/PlayerContext'
import { useContext } from 'react'

export const usePlayer = () => {
  return useContext(PlayerContext)
}
