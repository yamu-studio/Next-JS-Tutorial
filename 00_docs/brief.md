# Project Brief

## 成果物と利用場面

既存のWeb開発経験を持ち、Next.jsを体系的に試したい開発者向けに、架空の商品カタログ・管理アプリと、追試可能な学習・検証記録を作る。題材は正式スケジュールの`/products`・`/products/[id]`、検索、CRUDを1つのデータでつなげられるため選んだ。実在の商品・顧客・取引は扱わない。

想定利用者は商品を探す閲覧者と、商品を登録・更新・削除する管理者。代表操作は、一覧から検索・ページ送りを使って詳細へ移動し、管理者が変更した商品が適切なタイミングで表示へ反映されることを確認する流れである。認証・認可の実装方式はDay 4の教材と設計条件を確認して決める。

## 問いと仮説

**問い:** 既存のWeb開発経験を持つ開発者がNext.jsを7日間で使うとき、標準的なWebアプリの実装に必要な設計判断・理解の穴・実務との差をどこまで言語化できるか。

**仮説:** 手順、観測した事実、自分の解釈、設計判断、未検証事項を別々に記録すれば、完走記録より次の実装判断に使える学びが残る。

## MVP

- 架空の商品一覧・検索・詳細、管理者による登録・更新・削除を、Day 1〜7の対象を動作で試せる範囲で作り、起動手順・確認経路・結果を残す。
- 対象教材と実行環境を固定し、少なくとも1つの設計判断を伴う変更を試す。
- 教材の指示・実施内容・観測事実・自分の解釈・設計判断・未検証事項を区別した記録を残す。
- 一覧と詳細のURL、管理者だけが行える更新、変更後の再表示を同じ商品データで追試できるようにする。

完走のみをNext.js全般への習熟や本番運用可能性の証拠とはしない。

## 学習範囲と到達点

教材の基準版はNext.js `16.3.5`（package-lock.jsonで固定）とし、各日の公式App Router Docs候補を記載する。URLとページ内容は2026-09-24に、インストール済みNext.jsパッケージの`node_modules/next/dist/docs/`とpackage-lock.jsonで確認した。Day 1開始時に実際に使う各ページのURL・確認日・版またはcommit SHAを学習記録へ転記し、教材更新があれば差分を記録する。公式Learnは必要に応じて補足し、採用ページと版は同じ方法で記録する。

| Day | 対象要素・公式資料候補 | 到達点 | 対象外（別日に扱うものを含む） |
|---|---|---|---|
| 1｜導入 | [Installation](https://nextjs.org/docs/app/getting-started/installation)、[Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)、[Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)、[Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating)。Next.jsとReact、App Router、`create-next-app`、`app`・`public`、`page.tsx`・`layout.tsx`、Route・Dynamic Route・Route Group、`Link`・Navigation。 | `/`・`/about`・`/products`・`/products/[id]`を作り、URLと画面遷移、主要ファイルの役割を説明できる。 | データ取得・DB・フォーム・更新処理はDay 3〜4へ。Parallel/Intercepting Routesなど複雑なroutingは7日以降の必要性判断へ。 |
| 2｜Server／ClientとUI | [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)、[CSS](https://nextjs.org/docs/app/getting-started/css)、[Images](https://nextjs.org/docs/app/getting-started/images)、[Fonts](https://nextjs.org/docs/app/getting-started/fonts)、[Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)。境界、`'use client'`、コンポーネント分割、CSS・Tailwind、`next/image`、`next/font`、Metadata。 | 対話UIとサーバー側UIを分け、境界の理由と表示・スタイル・画像・フォント・Metadataの結果を説明できる。 | 認証・認可はDay 4、描画・キャッシュの比較はDay 5へ。高度なデザインシステムや状態管理は本企画の対象外。 |
| 3｜データ取得 | [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)。`async` Server Component、DB接続と取得、Dynamic RouteとDB、`searchParams`による検索、Pagination、`loading.tsx`、Suspense、Streaming、`notFound()`。 | DBデータの一覧・検索・詳細・ページ送りを確認し、読み込み中・該当データなしの挙動を説明できる。 | データ変更はDay 4、キャッシュ選択はDay 5へ。大規模DB設計・本番データ移行は対象外。 |
| 4｜更新とアクセス制御 | [Mutating Data](https://nextjs.org/docs/app/getting-started/mutating-data)、[Authentication](https://nextjs.org/docs/app/guides/authentication)、[Proxy](https://nextjs.org/docs/app/getting-started/proxy)。Form、Validation、Server Functions／Actions、CRUD、Pending UI、Error Handling、`revalidatePath`・`revalidateTag`・`updateTag`、Authentication・Authorization、Proxy。 | 登録・編集・削除と更新後表示を確認し、不正入力・失敗・保護対象への許可／拒否を説明できる。 | 認証方式はアプリと固定版Docsを見て選ぶ。RBAC等の本番向け詳細設計、外部IdPとの本番連携は対象外。 |
| 5｜描画・キャッシュ・API | [Caching](https://nextjs.org/docs/app/getting-started/caching)、[Revalidating](https://nextjs.org/docs/app/getting-started/revalidating)、[Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)、[use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)。Static／Dynamic Rendering、Caching、Revalidation、Cache Components、`use cache`、Suspense・Streaming・Prefetching、Route Handlers、外部API。 | 読み取りと更新の表示・再検証を比べ、Route HandlerとServer Functionの用途の違いを説明できる。 | 分散キャッシュ、負荷試験、PPR等の性能設計の深掘りは対象外。7日後の候補とする。 |
| 6｜品質・安全性 | [Error Handling](https://nextjs.org/docs/app/getting-started/error-handling)、[Testing](https://nextjs.org/docs/app/guides/testing)、[Authentication](https://nextjs.org/docs/app/guides/authentication)。Error Handling、Validation、Accessibility、環境変数・Secret、Authorization、Unit／Integration／E2E Test、Playwright／Vitestの採否、Performance、Bundle Size、Lazy Loading、Image Optimization、Core Web Vitals。 | 主要な失敗・認可経路を確認し、リスクに合わせてテストを選び、アクセシビリティ・性能・secretの確認結果または未確認理由を残す。 | 網羅的な脆弱性診断、第三者監査、全ブラウザー・端末の性能保証は対象外。必要性が確認できた場合に後続テーマとする。 |
| 7｜公開準備・運用 | [Deploying](https://nextjs.org/docs/app/getting-started/deploying)、[Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)、[Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)、[robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)。Production Build、deploy環境・環境変数、CI、lint・型検査・test・build、SEO・Metadata・OG・Sitemap・robots、Logging・Analytics・Web Vitals。 | Production buildと採用したCI・公開前確認を記録し、公開準備状況と残る制約を説明できる。 | 実サービスとしての一般公開はMVPの必須条件ではなく、下記の条件を満たし企画オーナーが別途承認した場合のみ行う。大規模運用・SLAは対象外。 |

日程は、2026-09-25をDay 1とする暫定計画に従い、予定日と実施日を分けて記録する。

## 実行環境

2026-09-24に確認した開始時点の環境:

| 項目 | 固定値 |
|---|---|
| OS | macOS 14.8.9（Build 23J631、arm64） |
| Node.js | `v22.14.0` |
| Package manager | npm `10.9.2` |
| Lockfile | `package-lock.json`、lockfileVersion 3 |
| 主要依存 | Next.js `16.3.5`、React／React DOM `19.2.8`、TypeScript `5.9.3`（lockfile記載） |
| Starter | `create-next-app`生成の初期構成を使用。公式Learn指定starterは採用しない。教材の追加starterが必要になれば、Day 1開始前に理由と変更を記録する。 |

これは実施前に確認した環境値である。実施日にも実値を記録し、差があればこちらを上書きせず差分を残す。

## 実公開の判断条件

実公開はMVPの範囲外の任意判断とし、7日間の完走やローカルbuild成功だけでは実施しない。少なくとも以下を確認し、該当しない項目には理由と受容するリスクを記録する。

- production buildと採用したCI（lint・型検査・test等）が成功し、主要な利用経路と失敗時の挙動を確認している。
- 秘密情報・実利用者データがコードやGit履歴に含まれず、環境変数・認可境界・公開設定を確認している。
- MIT表示と、教材由来のコード・画像・文面・フォント等の出典・ライセンス・公開可否を確認している。
- README・起動方法・公開環境の設定・既知の制約が実態と一致し、公開後のログ確認と問題時の停止・戻し方を決めている。

**最終判断者:** 企画オーナー（本企画の制作担当者）。条件確認後、公開対象・公開先・実施日を明示して可否を決める。判断が得られない場合は公開しない。第三者レビューが必要となる公開範囲・リスク基準は現時点で未設定であり、必要性を判断時に確認する。

## 非対象

- 一般的な学習効果の測定、外部学習者の評価収集、公式教材の品質評価。
- 7日間の学習完了だけを根拠とする本番採用判断。
- 必要性を確認する前のCache・Security・Testing等の上級テーマの一括実施。
- 実公開の承認がない状態でのデプロイ・公開。
