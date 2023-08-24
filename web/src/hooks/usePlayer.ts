'use client'

import { PlayerContext } from '@/contexts/PlayerContext'
import { useContext } from 'react'

export const usePlayer = () => useContext(PlayerContext)
