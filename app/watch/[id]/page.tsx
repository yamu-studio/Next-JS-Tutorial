import Link from 'next/link'
import { notFound } from 'next/navigation'
import { videos } from '../data'

type WatchPageProps = {
  // Next.js 16では動的ルートのparamsはPromiseとして渡されます。
  params: Promise<{ id: string }>
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params
  const video = videos.find((item) => item.id === id)

  if (!video) {
    notFound()
  }

  return (
    <article className='watch-page'>
      <div aria-label='動画プレビュー' className='watch-player' role='img'>
        <span aria-hidden='true'>▶</span>
        <p>動画プレビュー</p>
      </div>
      <div className='watch-content'>
        <p className='eyebrow'>WATCH · {video.duration}</p>
        <h1>{video.title}</h1>
        <p className='watch-meta'>
          {video.channelName} · {video.views} 回視聴 · {video.publishedAt}
        </p>
        <p className='watch-description'>{video.description}</p>
        <p className='route-note'>
          このページは <code>/watch/[id]</code>{' '}
          という動的ルートで、URLのIDに応じた動画を表示しています。
        </p>
        <Link className='text-link back-link' href='/'>
          ← トップページへ戻る
        </Link>
      </div>
    </article>
  )
}
