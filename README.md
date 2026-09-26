# 僕がNext.jsのチュートリアルをやるなら

> 現在はDay 1開始前です。学習記録とアプリの機能は未完成です。

既存のWeb開発経験を持つ開発者が、Next.js公式App Router Docsを中心に、必要に応じてLearnも使い、7日間でWebアプリの主要機能を試して設計判断や理解の穴を記録するプロジェクトです。成果物として、学習テーマを動作で確かめるサンプルアプリを作ります。

## 問い

既存のWeb開発経験を持つ開発者がNext.jsを7日間で使ってみるとき、設計判断・理解の穴・実務との差をどこまで言語化できるか。

## 作るもの

架空の商品カタログ・管理アプリを作ります。閲覧者は一覧・検索・詳細を使い、管理者は商品を登録・更新・削除します。同じ商品データで画面遷移、Server／Clientの境界、DB、認証、キャッシュ、品質確認を順に試します。実在の商品・顧客・取引は扱いません。

## 範囲

- まず7日間で、Routing、Server/Client Components、データ取得、CRUD、描画・キャッシュ、品質、公開準備を扱う。
- 7日以降のCache、Security、Testingなどは、必要性が確認できたテーマだけを深掘りする。
- 教材の版・環境・対象範囲はDay 1開始前に固定する。

## 現在地

Next.jsの初期環境と7日間の範囲・教材候補・記録方法を用意しました。アプリは初期画面の状態で、商品機能と日別検証は未実施です。実際に使う教材ページと版は各Dayの学習記録へ残します。

## 非対象

- 初学者一般の理解度の評価
- 公式教材そのものの品質評価
- 7日間の学習完了だけを根拠とした本番採用判断

## 記録と検証

開始前に`00_docs/brief.md`、各日の実施前に`00_docs/validation-plan.md`を確認します。記録は`00_docs/learning-record-template.md`を使用します。開始時点の環境はmacOS 14.8.9、Node.js v22.14.0、npm 10.9.2、Next.js 16.3.5、React 19.2.8です。

初期環境の起動は`npm ci`→`npm run dev`、静的確認は`npm run lint`・`npx tsc --noEmit`・`npm run build`です。Day別の動作結果やテストコマンドは実施後に記録します。

## プロジェクト資料

- 企画概要・範囲: [`00_docs/brief.md`](00_docs/brief.md)
- 検証条件・証拠: [`00_docs/validation-plan.md`](00_docs/validation-plan.md)
- 学習記録の形式: [`00_docs/learning-record-template.md`](00_docs/learning-record-template.md)

## License

MIT License。条件は[`LICENSE`](LICENSE)を参照してください。教材由来のコード・素材は、対象教材のライセンスと利用条件も確認します。
