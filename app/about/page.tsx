import Link from 'next/link'

export default function AboutPage() {
  return (
    <article className='prose'>
      <div className='page-heading'>
        <p className='eyebrow'>ABOUT THIS PROJECT</p>
        <h1>このサイトについて</h1>
        <p>
          Next.jsの公式教材を使って7日間で基本的なWebアプリを試す学習プロジェクトです。
        </p>
      </div>
      <p>
        動画プラットフォーム的なものを作っていく過程で、ページの作り方や画面間の移動を学んでいます。表示する動画やチャンネルは学習用の架空データです。
      </p>
      <p>
        Day
        1ではトップページとこのページ、URLのIDに応じて表示が変わる動画ページを作っています。
      </p>
      <Link className='text-link' href='/'>
        トップページへ戻る
      </Link>
    </article>
  )
}
