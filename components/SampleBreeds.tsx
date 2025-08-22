"use client"
import { useEffect, useState } from 'react'

export default function SampleBreeds() {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string| null>(null)
  useEffect(() => {
    fetch('/api/demo-breeds')
      .then(r => r.json())
      .then(j => { if (j.error) setError(j.error); else setData(j.breeds || []) })
      .catch(e => setError(String(e)))
  }, [])
  if (error) return <div className="text-xs text-red-600">Error: {error}</div>
  if (!data.length) return <div className="text-xs text-textMuted">...</div>
  return (
    <ul className="flex flex-wrap gap-2 text-xs">
      {data.map(b => <li key={b.id} className="px-2 py-1 rounded-full border bg-backgroundAlt">{b.name}</li>)}
    </ul>
  )
}
