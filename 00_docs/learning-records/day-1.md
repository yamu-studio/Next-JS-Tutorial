# Day 1｜動画アプリの導入とルーティング

## 対象

- 教材URL（公式Docs）:
  - https://nextjs.org/docs/app/getting-started/installation
  - https://nextjs.org/docs/app/getting-started/project-structure
  - https://nextjs.org/docs/app/getting-started/layouts-and-pages
  - https://nextjs.org/docs/app/getting-started/linking-and-navigating
  - https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes
- 実施日: 2026-10-01
- 対象範囲: YouTube風動画閲覧アプリのトップページ、Aboutページ、`/watch/[id]`動画ページ。固定モックデータを使ったページ表示と画面遷移を扱う。検索・チャンネル・いいね・コメント・外部APIは後続の日に扱う。

## 教材の指示

- `app`以下のフォルダーがURLセグメントに対応し、`page.tsx`でそのURLの画面を定義する。`layout.tsx`は子ページを包む共有UIを定義する。
- `[id]`形式のフォルダーで動的ルートを定義し、ページは`params`からURLの値を受け取る。Next.js 16では`params`をPromiseとして受け取り、`await`する。
- `Link`でページ間を移動できる。`public`は静的アセットを置くフォルダー。

## 実施したこと

- トップページに固定モック動画を表示し、動画ごとのリンクから`/watch/[id]`へ移動できるようにした。
- `/about`にプロジェクトの説明を置き、共通レイアウトにサイト名・ナビゲーション・フッターを設定した。
- 動画詳細ページでURLのIDに一致する動画を表示するようにした。未知のIDでは`notFound()`を呼び出す。
- 実画像・動画素材や外部APIはまだ使わず、CSSのプレースホルダーで動画プレビュー領域を表現した。

## 観測した事実

- ESLint、TypeScript型検査、Next.js production buildはいずれも終了コード0で完了した。
- `npm run lint`、`npm run build`、build後の`npx tsc --noEmit`、`git diff --check`はいずれも終了コード0で完了した。
- build出力では`/`・`/about`がStatic、`/watch/[id]`がDynamicとして表示された。
- production serverの起動を試したが、実行環境のポート制限で`listen EPERM`となった。HTTP応答とブラウザー上の表示は確認できていない。

## 自分の解釈

- トップページの固定データから動的URLを組み立てることで、一覧的な表示から個別の動画ページへ進むルート関係を確認できる。
- buildは3つのルートを認識したが、build成功だけではリンク操作・見た目・未知IDのHTTP 404応答を確認したことにはならない。

## 設計判断

- 判断したこと: Day 1ではルーティングに集中し、動画データを固定モックとして使う。
- 前提・代替案: この日の対象はページ構成と遷移の確認。JSONPlaceholder系APIや`public`内の画像・動画素材は後続の学習で扱う。
- 採用理由: 外部データ取得や素材選定を先に持ち込まず、トップ・About・動的動画ページの関係を確認できる。
- 確認結果・限界: lint・型検査・buildでコードとルート構成を確認した。サーバーを起動できなかったため、HTTPとブラウザーでの動作は未確認。

## 試した変更

- `app/page.tsx`: 動画モックの表示と詳細ページへのリンクを実装。
- `app/about/page.tsx`: 学習プロジェクトの説明を実装。
- `app/watch/[id]/page.tsx`・`app/watch/data.ts`: 動的動画詳細と固定モックデータを実装。
- `app/layout.tsx`・`app/globals.css`: 動画アプリ向けの共通ナビゲーション、メタデータ、スタイルを設定。

## 検証結果

- `npm run lint`: 成功。
- `npm run build`: 成功。Next.js `16.3.5`で`/`・`/about`・`/watch/[id]`を生成。
- `npx tsc --noEmit`: build後に成功。
- `git diff --check`: 成功。
- HTTP確認: production serverが`listen EPERM`で起動せず未実施。

## 未検証事項・次の疑問

- ブラウザーでトップ・About・有効な動画ページを開き、画面遷移、レスポンシブ表示、キーボード操作を確認する。
- 存在しない動画IDのHTTP 404応答は未確認。
- 動画素材はプレースホルダーのまま。後続の学習で`public`に置く素材の出典・利用条件を確認する。
- JSONPlaceholder系APIで取得するデータと動画モックの対応付け、両者の切り替え方は未決定。
- 次はServer／Client ComponentsとUIを扱う。
