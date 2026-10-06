'use client'

import { useState } from 'react'

export default function LikeButton() {
  const [liked, setLiked] = useState(false)

  return (
    <button
      aria-pressed={liked}
      className={`inline-flex min-h-11 items-center gap-2 rounded border px-4 font-semibold text-[#244735] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c27737] ${liked ? 'border-[#315c47] bg-[#e9eee5]' : 'border-[#e4e8df] bg-white'}`}
      onClick={() => setLiked((current) => !current)}
      type='button'
    >
      <span aria-hidden='true'>{liked ? '♥' : '♡'}</span>
      {liked ? 'いいね済み' : 'いいね'}
    </button>
  )
}
