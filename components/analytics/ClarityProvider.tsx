'use client'

import { useEffect } from 'react'
import Clarity from '@microsoft/clarity'

interface ClarityProviderProps {
  projectId: string
}

/**
 * Initialises Microsoft Clarity using the official @microsoft/clarity npm package.
 * Must be a client component — Clarity accesses the window object.
 * Only mounts when a projectId is provided.
 */
export function ClarityProvider({ projectId }: ClarityProviderProps) {
  useEffect(() => {
    try {
      Clarity.init(projectId)
    } catch {
      // Clarity init errors must never break the app
    }
  }, [projectId])

  return null
}
