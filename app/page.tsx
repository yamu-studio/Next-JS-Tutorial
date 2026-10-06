import Link from 'next/link'
import Image from 'next/image'
import { videos } from './watch/data'

export default function HomePage() {
  return (
    <>
      <section className='hero'>
        <p className='eyebrow'>NEXT.JS LEARNING PROJECT</p>
        <h1>好きな動画を、見つけよう。</h1>
        <p className='hero-copy'>
          動画プラットフォーム的なものを作っていく過程でNext.jsのページとルーティングを学ぶためのプロジェクトです。
        </p>
        <Link className='button-link' href={`/watch/${videos[0].id}`}>
          おすすめ動画を見る <span aria-hidden='true'>→</span>
        </Link>
      </section>

      <section aria-labelledby='featured-heading' className='featured-section'>
        <div className='page-heading'>
          <p className='eyebrow'>PICK UP</p>
          <h2 id='featured-heading'>おすすめの動画</h2>
        </div>
        <ul className='video-grid' aria-label='おすすめ動画'>
          {videos.map((video) => (
            <li className='video-card' key={video.id}>
              <Link className='video-card-link' href={`/watch/${video.id}`}>
                <div className='video-thumbnail'>
                  <Image
                    alt=''
                    className='thumbnail-image'
                    height={360}
                    src={video.thumbnail}
                    width={640}
                  />
                  <span>{video.duration}</span>
                </div>
                <div className='video-card-content'>
                  <h3>{video.title}</h3>
                  <p>{video.channelName}</p>
                  <p>
                    {video.views} 回視聴 · {video.publishedAt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
