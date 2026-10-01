# Day 1｜導入とルーティング

## 対象

- 教材URL（公式Docs）:
  - https://nextjs.org/docs/app/getting-started/installation
  - https://nextjs.org/docs/app/getting-started/project-structure
  - https://nextjs.org/docs/app/getting-started/layouts-and-pages
  - https://nextjs.org/docs/app/getting-started/linking-and-navigating
- 実施日: 2026-09-26
- 対象範囲: App Routerのページと共有レイアウト、固定データを使う一覧・動的詳細、`Link`による画面遷移。検索・DB・フォーム・更新処理は含めない。

## 教材の指示

- `app`以下のフォルダーがURLのセグメントに対応し、`page.tsx`または`route.ts`を置くとそのルートが公開される。
- `layout.tsx`は子ページを包む共有UIを定義する。root layoutには`html`と`body`が必要。
- `[segment]`形式のフォルダーは動的ルートセグメントとなり、ページは`params`からURLの値を読む。Next.js 16では`params`はPromiseとして受け取り、`await`する。
- `next/link`の`Link`はリンク先への遷移を行い、ブラウザーの`a`要素にプリフェッチやクライアント側遷移を加える。
- `public`は静的アセットを置くフォルダー。今回は画像アセットを追加していない。

## 実施したこと

- `app/page.tsx`を学習プロジェクトのトップページに変更し、`Link`で商品一覧へつないだ。
- root layoutに日本語の共有ヘッダー・ナビゲーション・フッターを置き、サイトのメタデータを設定した。
- `/about`にプロジェクト説明、`/products`に架空商品3件の一覧、`/products/[id]`にIDに応じた詳細を追加した。
- 商品データを`app/products/data.ts`にまとめた。該当する商品IDがない場合は`notFound()`を呼び出す。
- ファイルの役割、固定サンプルデータ、動的`params`の読み方を説明する日本語コメントを追加した。
- 実行コマンド: `npm run lint`、`npx tsc --noEmit`、`npm run build`。HTTP確認のためproduction serverを起動し、各URLへGETした。

## 観測した事実

- ESLint、TypeScript型検査、Next.js production buildはいずれも終了コード0で完了した。
- build出力では`/`・`/about`・`/products`がStatic、`/products/[id]`がDynamicとして表示された。
- production serverへのGET結果は、`/`・`/about`・`/products`・`/products/linen-tote`がHTTP 200、`/products/missing`がHTTP 404だった。
- `git diff --check`は問題を報告しなかった。

## 自分の解釈

- ファイル名とフォルダー構造からURLが決まり、`page.tsx`がそのURLで表示する内容を決める。`layout.tsx`に共通部分を置くことで、各ページに同じヘッダーを重ねて書かずに済んだ。
- `/products/[id]`は商品ごとにページファイルを増やさず、URLの値をキーにして同じページ内で表示内容を選べる。
- `Link`を使うと、画面間の遷移先がコード上で明示される。今回のHTTP確認だけではプリフェッチや操作時の体感速度までは観測していない。

## 設計判断

- 判断したこと: Day 1の商品データはDBではなく、型推論される固定サンプルとして`app/products/data.ts`に置く。
- 前提・代替案: Day 1の到達点はルーティングの確認。DB取得はbriefでDay 3以降の範囲。今すぐDBやAPIを追加する案もある。
- 採用理由: データ取得や更新処理を加えずに、一覧リンクから動的詳細へ進む関係を確認できる。商品配列を1か所にまとめ、後の日にデータ取得へ置き換える箇所も分かる。
- 確認結果・限界: 一覧と有効な商品詳細がHTTP 200、未知の商品IDが404になることを確認した。永続化・検索・更新は未実装であり、実運用のデータ設計を示すものではない。

## 試した変更

- `app/page.tsx`: create-next-appの初期画面を商品カタログのトップページへ置き換え。
- `app/layout.tsx`・`app/globals.css`: 共通ナビゲーション、日本語メタデータ、各ページに共通するスタイルを追加。
- `app/about/page.tsx`・`app/products/page.tsx`・`app/products/[id]/page.tsx`: 3つの画面と画面遷移を追加。
- `app/products/data.ts`: 3件の架空商品と商品型を定義。

## 検証結果

- `npm run lint`: 成功。
- `npx tsc --noEmit`: 成功。
- `npm run build`: 成功。Next.js `16.3.5`で全ルートを生成。
- production server HTTP確認: 4つの対象URLは200、存在しない商品IDは404。
- `git diff --check`: 成功。

## 未検証事項・次の疑問

- ブラウザーでの表示・レスポンシブ表示・キーボード操作は未確認。HTTP応答とbuild成功は見た目や操作性の評価を保証しない。
- `Link`によるプリフェッチが実際にいつ発生するか、ブラウザー開発者ツールでは計測していない。
- Route GroupはURLを変えずに整理する仕組みとして資料を確認したが、Day 1の画面数では必要がないため使っていない。
- Node.js・npmの実行値がbriefの開始時点の固定値と異なる。この差が別の環境での再現性に与える影響は確認していない。
- 次はDay 2のServer／Client ComponentsとUIを扱う。現時点のページは対話処理を持たず、クライアント状態も使っていない。
