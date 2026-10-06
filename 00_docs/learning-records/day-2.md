# Day 2｜Server／Client Componentsと動画UI

## 対象

- 教材URL（公式Docs）:
  - https://nextjs.org/docs/app/getting-started/server-and-client-components
  - https://nextjs.org/docs/app/getting-started/css
  - https://nextjs.org/docs/app/getting-started/images
  - https://nextjs.org/docs/app/getting-started/fonts
  - https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- 追加で確認した教材:
  - https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
  - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- 教材の確認日・版・commit SHA: 2026-10-01および2026-10-06、インストール済みNext.js `16.3.5`の`node_modules/next/dist/docs/`を確認。教材のcommit SHAは配布パッケージから特定できないため未確認。作業開始時のプロジェクトHEADは`e0204541eb2760fb88f2c22e6b43c651d3009aec`。
- 実施日: 2026-10-01（Day 2実装）、2026-10-06（対象要素の追補）
- 実行環境: macOS（brief記載の開始時点は14.8.9 arm64）、Node.js `v24.21.0`、npm `11.19.0`。開始時点の固定値Node.js `v22.14.0`・npm `10.9.2`とは異なる。
- 対象範囲: Day 1で作成した架空動画カタログのServer／Client境界、対話UI、CSS、ローカル画像、フォント方針、動画詳細Metadata。

## 教材の指示

- App Routerではページとレイアウトは既定でServer Component。状態・イベントハンドラー・ブラウザーAPIが必要なUIをClient Componentにする。
- `'use client'`はClient Componentのモジュール境界を定義する。境界ファイルのimport先もクライアント側モジュールグラフに含まれるため、必要な箇所に絞る。
- CSSにはTailwind CSS、CSS Modules、Global CSSなど複数の方法がある。Global CSSはルートレイアウトから読み込める。
- `next/image`は画像に寸法を与えてレイアウトシフトを避けられる。ローカル画像は`public`から参照できる。
- `next/font`はフォントを最適化してセルフホストできる。MetadataはServer Componentのlayout/pageから静的オブジェクトまたは`generateMetadata`で定義する。

## 実施したこと

- 動画詳細ページに「いいね」ボタンを追加し、状態とクリック処理を持つ部分だけを`'use client'`付きコンポーネントにした。
- トップ一覧と動画詳細のサムネイルを、プロジェクト内で作成したSVG素材と`next/image`で表示した。動画詳細のサムネイルは`priority`を指定した。
- 動画IDに応じて詳細ページのtitleとdescriptionを返す`generateMetadata`を追加した。
- 既存のGlobal CSSを使い、サムネイル・ボタン・フォーカス表示を追加した。
- 使用環境のNode.js・npmの実値を確認した。
- `/about`を`app/(pages)/about/page.tsx`に移し、URLを維持したRoute Groupを追加した。
- 「いいね」ボタンの表示にTailwind utilityを使い、状態に応じてクラスを切り替えた。
- `next/font/google`の`Noto_Sans_JP`をルートレイアウトで読み込み、CSSのfont-familyに適用した。
- `app/opengraph-image.tsx`を追加し、`ImageResponse`でOG画像を生成するようにした。

## 観測した事実

- `npm run lint`、`npx tsc --noEmit`、`git diff --check`はいずれも終了コード0で完了した。
- `npm run build`（Turbopack）はCSS処理中の内部ポートbindが`Operation not permitted`となり、最終差分では完了できなかった。Next.js CLIガイドを確認し、`npx next build --webpack`で代替buildを実行した。
- `npx next build --webpack`は成功し、`/`・`/about`をStatic、`/watch/[id]`をDynamicとして出力した。
- 追補後のbuildは`/opengraph-image`も生成し、Route Group内の`/about`は従来どおりStaticとして出力した。
- OG画像のURL解決について、`metadataBase`未設定時は`http://localhost:3000`を使う警告が出た。
- `next/font/google`の初回ビルドはsandbox内で`fonts.googleapis.com`の名前解決に失敗した。sandbox外での再実行でフォント取得とcompileは通ったが、古い`.next/dev/types`参照で型検査が停止した。生成物を整理した後のWebpack buildは成功した。
- build時にローカルSVGを含むアプリがコンパイルされ、静的ページ生成も完了した。
- 実行時のNode.js `v24.21.0`・npm `11.19.0`はbriefに記載された開始時点のNode.js `v22.14.0`・npm `10.9.2`と異なる。
- ブラウザーでのクリック・画像表示・Metadata確認は行っていない。

## 自分の解釈

- 動画ページ全体をClient Componentにせず、状態が必要なボタンだけを分離すると、読み取り中心のページ構成を保ったまま操作を追加できる。
- Metadataの生成はサーバー側に残るため、URLの動画データとページタイトル・説明を同じデータ源から組み立てられる。
- Route Groupはフォルダー構成を整理しつつURLを変えない。
- Tailwind utilityとGlobal CSSは併用できる。今回のボタンでは状態依存の見た目をutilityで書いた。
- OG画像ファイル規約を使うと、画像と対応するOG metadataをNext.jsが生成する。
- lint・型検査・buildは構成とコンパイルの確認にはなるが、実ブラウザーでの操作や視覚上の品質までは証明しない。

## 設計判断

- 判断したこと: Client Componentの範囲を「いいね」ボタンに限定する。
- 前提・代替案: ページ全体をClient Componentにする方法、一覧・詳細ページ全体をServer Componentのままにする方法がある。
- 採用理由: 状態とイベントが必要なのはボタンだけで、ページ内の動画データ表示やMetadata生成にはクライアント処理が不要なため。
- 確認結果・限界: lint・型検査・buildは成功。状態はページ表示中だけ保持するため、再読み込み後の永続化はしない。ブラウザー上の操作は未確認。

- 初回実装時の判断: 画像はプロジェクト内のSVGを使い、既存のGlobal CSSを継続する。フォントは既存のOSフォールバック指定を維持し、`next/font`は追加しない。
- 前提・代替案: 外部画像やGoogle Fontsの取得、ローカルフォントファイルの追加、CSS ModulesやTailwind utilityへの置き換えは行える。
- 採用理由: この日の変更をローカル素材と現在のCSS方針に閉じ、未導入の外部素材やフォント取得をbuild条件に持ち込まないため。既存CSSのレスポンシブ設計も再利用できる。
- 初回実装時の確認結果・限界: SVG素材を使ったbuildは成功した。フォント最適化・CSS Modules・Tailwind utilityとの比較は未実施だったため、追補で`next/font`とTailwind utilityを試した。

- 追補で更新した判断: `/about`にRoute Groupを適用し、Client ComponentのボタンにTailwind utilityを使った。フォントは`Noto_Sans_JP`を`next/font/google`で読み込む。
- 前提・代替案: Route GroupはURLを変えずに構成を整理できる。全画面をTailwind化する方法、Global CSSだけにする方法もある。Google Fontsの代わりにローカルフォントを使う方法もある。
- 採用理由: Route Group・utility・`next/font`を小さな範囲で個別に試し、既存UIへの影響を抑えるため。
- 確認結果・限界: lint・型検査・Webpack buildは成功。Google Fonts使用時はビルド環境にフォント取得が必要になる。配布先のドメインが未確定のため`metadataBase`は設定していない。

## 試した変更

- `app/watch/like-button.tsx`: 状態を持つClient Componentを追加。
- `app/watch/[id]/page.tsx`: `next/image`によるプレビューと動画ごとのMetadataを追加。
- `app/page.tsx`・`app/watch/data.ts`: 一覧・詳細で使うサムネイル画像を接続。
- `public/quiet-morning.svg`・`public/small-cafe.svg`・`public/make-lunch.svg`: 架空動画用のローカルサムネイルを追加。
- `app/globals.css`: 画像の表示、いいねボタン、フォーカス状態のCSSを追加。
- `app/(pages)/about/page.tsx`: Route Groupを通してAboutページのURLを保った。
- `app/layout.tsx`: `next/font/google`のフォントを適用。
- `components/like-button.tsx`: Tailwind utilityで操作状態の見た目を設定。
- `app/opengraph-image.tsx`: OG画像を生成。
- `00_docs/learning-records/day-2.md`: 本記録を作成。

## 検証結果

- `npm run lint`: 成功。
- `npx tsc --noEmit`: 追補時、古い`.next/dev/types`が移動前の`app/about/page.tsx`を参照して失敗。生成済み`.next/dev`を削除し、Webpack buildが生成した現行ルート型で再確認して成功。
- `npm run build`: Turbopackがsandboxの内部ポートbind制限で失敗。
- `npx next build --webpack`: 成功。`/`・`/about`・`/opengraph-image`はStatic、`/watch/[id]`はDynamic。
- `git diff --check`: 成功。
- HTTP・ブラウザー確認: 未実施。

## 未検証事項・次の疑問

- `00_docs/brief.md`の題材・日別到達点は商品カタログとして記述されている一方、pull後のDay 1記録と実装は動画カタログになっている。Day 3開始前に正本のスコープを揃える。
- ブラウザーで「いいね」の切り替えとキーボード操作を確認する。
- 各画面の画像の見え方、狭い画面でのレイアウト、生成されたtitle・descriptionを確認する。
- `metadataBase`は公開ドメイン未確定のため未設定。OG画像URLは本番環境のドメインで確認する。
- ブラウザーでの実表示、フォントの日本語字形、生成OG画像の見た目は未確認。
- 実行環境のNode.js・npmがbrief記載値と異なる。Day 3以降も実値を記録し、差分を踏まえて検証結果を解釈する。
