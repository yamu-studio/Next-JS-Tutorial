import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const projectFont = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-project-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Moment | Next.js 学習プロジェクト',
    template: '%s | Moment',
  },
  description: '架空の動画カタログでNext.jsの基本を学ぶプロジェクトです。',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html className={projectFont.variable} lang='ja'>
      <body>
        {/* layout.tsx は全ページ共通の枠を作り、各 page.tsx を children に表示します。 */}
        <div className='site-shell'>
          <header className='site-header'>
            <Link className='brand' href='/'>
              Moment
            </Link>
            <nav aria-label='メインナビゲーション' className='site-nav'>
              <Link href='/'>トップ</Link>
              <Link href='/about'>このサイトについて</Link>
            </nav>
          </header>
          <main className='site-main'>{children}</main>
          <footer className='site-footer'>
            学習用の架空動画カタログです。実在の動画サービスではありません。
          </footer>
        </div>
      </body>
    </html>
  )
}
