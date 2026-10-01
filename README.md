# 僕がNext.jsのチュートリアルをやるなら

> Day 1の3画面と動的ルートを実装し、lint・型検査・buildを確認しました。ブラウザーでの表示・画面遷移は未確認です。

既存のWeb開発経験を持つ開発者が、Next.js公式App Router Docsを中心に、必要に応じてLearnも使い、7日間でWebアプリの主要機能を試して設計判断や理解の穴を記録するプロジェクトです。成果物として、学習テーマを動作で確かめるサンプルアプリを作ります。

## 問い

既存のWeb開発経験を持つ開発者がNext.jsを7日間で使ってみるとき、設計判断・理解の穴・実務との差をどこまで言語化できるか。

## 作るもの

YouTube風の動画閲覧アプリを作ります。トップ・動画・検索・チャンネルの各画面と、いいね・コメントなどの閲覧者向け操作を通じてNext.jsを学びます。表示する動画・チャンネルは架空のモックデータを基本とし、データ取得の学習ではJSONPlaceholder系の外部APIも試す予定です。実際のYouTubeサービスや実在の利用者データは扱いません。

## 範囲

- 公式App Router Docsを参考にした独自の7日間計画で、Routing、Server／Client Components、データ取得、いいね・コメントなどの対話操作、描画・キャッシュ、品質、公開準備を扱う。
- 7日以降のCache、Security、Testingなどは、必要性が確認できたテーマだけを深掘りする。
- 使用するNext.jsの版・環境・対象範囲は`00_docs/brief.md`に記載し、参照した教材と検証結果は各Dayの学習記録に残す。

## 現在地

2026-10-01にDay 1として、トップ（`/`）、About（`/about`）、動画詳細（`/watch/[id]`）を実装しました。共通レイアウトと`Link`を使い、URLのIDに対応する固定モック動画を表示します。動画プレビューはCSSのプレースホルダーで、動画再生機能はありません。

`npm run lint`・`npm run build`・build後の`npx tsc --noEmit`は成功しています。一方、production serverの起動時に実行環境のポート制限による`listen EPERM`が発生したため、HTTP応答とブラウザーでの表示・画面遷移、未知の動画IDのHTTP 404応答は未確認です。Day 1の到達点のうち、動作確認は残っています。

検索・チャンネル画面、いいね・コメント、外部API連携は後続の日に扱います。詳細は[Day 1の学習記録](00_docs/learning-records/day-1.md)を参照してください。

## 非対象

- 初学者一般の理解度の評価
- 公式教材そのものの品質評価
- 管理画面、動画の登録・編集・削除、認証・認可の実装
- 7日間の学習完了だけを根拠とした本番採用判断

## 記録と検証

開始前に`00_docs/brief.md`、各日の実施前に`00_docs/validation-plan.md`を確認します。記録は`00_docs/learning-record-template.md`を使用し、教材の指示・実施内容・観測事実・自分の解釈・設計判断・未検証事項を区別します。基準環境はmacOS、Node.js v24.21.0、npm 11.19.0、Next.js 16.3.5、React／React DOM 19.2.8、TypeScript 5.9.3です。依存関係は`package-lock.json`で固定しています。

ローカル起動は`npm ci`→`npm run dev`です。静的確認は`npm run lint`・`npm run build`・`npx tsc --noEmit`で行います。型検査はbuildによる型生成後に実行します。Day別の動作結果やテストコマンドは実施後に記録します。

7日間の学習完了やbuild成功だけで本番運用可能とは判断しません。アプリのデプロイ・一般公開は任意とし、`00_docs/brief.md`の公開条件を確認して企画オーナーが別途判断します。

## プロジェクト資料

- 企画概要・範囲: [`00_docs/brief.md`](00_docs/brief.md)
- 検証条件・証拠: [`00_docs/validation-plan.md`](00_docs/validation-plan.md)
- 学習記録の形式: [`00_docs/learning-record-template.md`](00_docs/learning-record-template.md)

## License

MIT License。条件は[`LICENSE`](LICENSE)を参照してください。教材由来のコード・素材は、対象教材のライセンスと利用条件も確認します。
