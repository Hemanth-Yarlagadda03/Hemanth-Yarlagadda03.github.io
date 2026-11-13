import { useEffect, useState } from 'react'

/** Detect whether a public asset URL resolves (for graceful placeholders). */
export function useMediaPresence(src: string | undefined) {
  const [present, setPresent] = useState<boolean | null>(null)

  useEffect(() => {
    if (!src) {
      setPresent(false)
      return
    }

    let cancelled = false
    const controller = new AbortController()

    fetch(src, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        if (!cancelled) setPresent(res.ok)
      })
      .catch(() => {
        if (!cancelled) setPresent(false)
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [src])

  return present
}
