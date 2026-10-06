// Day 1では動的ルートの確認に集中するため、動画情報は固定データにしています。
export const videos = [
  {
    id: 'quiet-morning',
    title: '静かな朝の過ごし方｜ゆっくり始める一日',
    channelName: '日々の記録',
    views: '12万',
    publishedAt: '3日前',
    duration: '12:48',
    description:
      'お気に入りのコーヒーを淹れて、朝の時間をゆっくり楽しむ様子を紹介します。',
    thumbnail: '/quiet-morning.svg',
  },
  {
    id: 'small-cafe',
    title: '街角の小さなカフェを訪ねて',
    channelName: '週末さんぽ',
    views: '8.4万',
    publishedAt: '1週間前',
    duration: '08:32',
    description:
      '路地裏で見つけたカフェと、そこで過ごす穏やかな午後の記録です。',
    thumbnail: '/small-cafe.svg',
  },
  {
    id: 'make-lunch',
    title: '季節の野菜で作る簡単ランチ',
    channelName: '台所ノート',
    views: '5.1万',
    publishedAt: '2週間前',
    duration: '15:06',
    description: '旬の野菜を使って、家でも作りやすいランチを用意します。',
    thumbnail: '/make-lunch.svg',
  },
] as const

export type Video = (typeof videos)[number]
