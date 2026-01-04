# フロントエンド開発ガイドライン

## 1. ブランチ運用とコミット規約 (Git Flow)

標準的な Git Flow 戦略と Conventional Commits を採用します。

### 1.1. ブランチ戦略

| ブランチ名  | 役割                                       | 分岐元  | マージ先      | 命名規則         |
| :---------- | :----------------------------------------- | :------ | :------------ | :--------------- |
| **main**    | 本番環境用。常にリリース可能な状態を維持。 | -       | -             | -                |
| **develop** | 開発用。次期リリースのための統合ブランチ。 | main    | -             | -                |
| **feature** | 新機能開発や変更。                         | develop | develop       | `feature/記述`   |
| **bugfix**  | リリース前のバグ修正。                     | develop | develop       | `bugfix/記述`    |
| **release** | リリース準備（バージョン番号の更新など）。 | develop | main, develop | `release/vX.Y.Z` |
| **hotfix**  | 本番環境の緊急修正。                       | main    | main, develop | `hotfix/記述`    |

### 1.2. コミットメッセージのフォーマット

Conventional Commits に従い、以下のフォーマットを使用してください。

`<type>: <subject>`

**Types:**

- **feat:** 新機能
- **fix:** バグ修正
- **docs:** ドキュメントのみの変更
- **style:** コードの動作に影響しない変更（空白、フォーマットなど）
- **refactor:** バグ修正も機能追加も行わないコードの変更
- **perf:** パフォーマンスを向上させるコードの変更
- **test:** テストの追加や修正
- **chore:** ビルドプロセスやドキュメント生成などの補助ツールやライブラリの変更

**例:**

- `feat: ログイン機能を追加`
- `fix: ヘッダーのレイアウト崩れを修正`
- `chore: パッケージ依存関係を更新`

### 1.3. Pull Request (PR) 運用

- PR のタイトルはコミットメッセージと同様のフォーマット (`<type>: <subject>`) を推奨します。
- PR 作成時に適切なマージ先（通常は `develop`）を選択してください。
- PR のタイトルと説明は日本語で記述してください。

## 2. 開発環境と技術スタック

### 2.1. 技術スタック

- **Framework:** Nuxt 4.2
- **Library:** Vue 3.5
- **Runtime:** Node.js 22
- **Language:** TypeScript

### 2.2. 開発環境

Docker を使用したコンテナ環境で開発を行います。

**起動手順:**

```bash
docker compose up
```

## 3. Nuxt 4 SCSS 開発規約 (SCSS Coding Standards)

### 3.1. 環境構築とパッケージ管理

- **ビルド高速化:** パフォーマンス向上のため、Dart Sassのバイナリ版である `sass-embedded` を導入する。大規模プロジェクトではビルド時間を約30%短縮できる。
- **不要なオプションの削除:** Nuxt 3移行時の名残である `javascriptEnabled: true` はLess用の設定であり、SCSSでは不要なため削除する。
- **ソースマップ設定:** デバッグ効率と本番パフォーマンスを両立するため、開発環境のみ有効化する。

### 3.2. ディレクトリ構造とファイル設計

- **関心の分離:** `assets/scss/` (基本的には `layers/base/app/assets/scss/`) 配下を以下の階層で管理し、役割を明確化する。
    - `foundation/`: 変数（`_variables.scss`）、Mixin（`_mixins.scss`）、関数（`_functions.scss`）。
    - `tokens/`: カラーやタイポグラフィなどのデザイントークン。
    - `utilities/`: ヘルパークラスなど。
    - `main.scss`: グローバルスタイルの集約点。
- **Partialの徹底:** 不要なCSS生成を防ぐため、定義ファイルには必ずアンダースコア（`_`）を付与する。
- **モジュール管理:** 非推奨の `@import` は使用せず、`@use` および `@forward` を使用する。

### 3.3. Nuxt設定（注入と配信の使い分け）

- **additionalData (注入):** 変数、Mixin、関数、プレースホルダーなど、「CSSを直接出力しない定義」のみを記述する。
    - 実スタイルを記述すると、全ファイルに重複注入されバンドルサイズが増大するため厳禁とする。
- **css 配列 (配信):** リセットCSS、ベーススタイル、ユーティリティなど、**「CSSとして出力すべきスタイル」**を指定する。

### 3.4. 実装パターンと命名規則

- **名前空間（Namespace）の選択:**
    - **中小規模:** `as *` を使用し、直接参照で記述を簡潔にする。ただし、変数名の衝突に注意する。
    - **大規模:** `as var` や `as mx` などの名前空間を付与し、リソースの出所を明確にする。
- **循環参照の回避:** 以下の階層構造（Layered Architecture）を遵守し、上位層が下位層を参照する形を徹底する。
    1. **基礎層 (Foundation):** 他を参照しない基本定義
    2. **トークン層 (Tokens):** 基礎層のみ参照
    3. **コンポーネント層 (Components):** 基礎層とトークン層を参照
    4. **ページ層 (Pages):** 全ての層を参照可能

- **BEM記法とプレフィックス:**
    - クラス名はBEM記法 (`Block__Element--Modifier`) を採用する。
    - 役割を明確にするため、以下のプレフィックスを付与する。
        - `l-`: Layout (レイアウト) - 例: `l-app`, `l-main`
        - `c-`: Component (コンポーネント) - 例: `c-header`, `c-btn`
        - `p-`: Page (ページ固有) - 例: `p-home`, `p-login`
        - `u-`: Utility (ユーティリティ) - 例: `u-text-center`

### 3.5. 保守性と連携

- **ドキュメント化:** 変数やMixinにはSassDoc形式のコメントを付与し、スタイルガイドを自動生成できる状態に保つ。
- **デザインシステム連携:** 必要に応じてデザイントークン（JSON）からSCSS変数を自動生成するスクリプトを活用する。
- **JSとの連携:** スタイルとロジックの一貫性を保つため、`:export` 機能を使用してSCSS変数をJavaScriptから参照可能にする。

## 4. アーキテクチャ設計思想

### 4.1. Container/Presentational パターン

本プロジェクトでは、コンポーネントの役割を明確に分離するため、Container/Presentational パターンを設計思想として採用し、厳格に適用します。

#### 4.1.1. Container Component

- **役割:** ビジネスロジック、データ取得（API通信）、状態管理（Storeへのアクセスなど）を担当します。
- **責務:**
    - Presentational Component に Props 経由でデータを渡す。
    - Presentational Component からのイベントを受け取り、処理を行う。
    - 具体的な DOM 構造やスタイルは極力持たない。
- **命名規則:**
    - コンポーネント名の末尾に `Container` を付与する（例: `UserListContainer.vue`）。

#### 4.1.2. Presentational Component

- **役割:** UI の見た目とインタラクションのみを担当します。
- **責務:**
    - データはすべて Props 経由で受け取る。
    - 自身の状態（state）は UI に関するもの（アコーディオンの開閉など）に限定する。
    - API 通信やビジネスロジックは持たない。
    - スタイル（CSS/SCSS）を持つ。

## 5. テスト戦略

開発効率を維持しつつ、リファクタリング耐性の高いコードベースを維持するため、以下の戦略でテストを運用します。

### 5.1. Unit / Component Test (Vitest)

ロジックの正当性と、UI コンポーネントの振る舞いを検証します。

- **Base コンポーネント:** すべての props による表示変化と emit の発火条件を網羅する。
- **Composables / Utils:** 業務ロジックを含む共通関数。副作用がある場合はモック化して純粋なロジックを検証する。
- **Stores (Pinia):** 複雑な State 更新ロジックや、Action による外部 API 呼び出しフロー。

### 5.2. E2E / Visual Regression Test (Playwright)

ブラウザ実機に近い環境でのユーザー体験を担保します。

- **Visual Regression Test (VRT):** デザイナーによる CSS 変更時、意図しないレイアウト崩れを防ぐ。Playwright の toHaveScreenshot() を活用。
- **シナリオテスト:** 「ログイン → 一覧表示 → 詳細編集 → 保存」といった、クリティカルな業務フローの整合性を担保。

### 5.3. テストファイルの配置

ソースコードの可読性を保つため、ソースファイルと同階層には置かず、各レイヤー内の tests ディレクトリにミラーリングして配置します。

**構成例:**

- ソース: `layers/base/components/base/SideMenu.vue`
- テスト: `layers/base/tests/components/base/SideMenu.spec.ts`

### 5.4. AAA パターン (Arrange-Act-Assert)

テストコードの構造を統一し、誰が見ても「何をテストしているか」を瞬時に理解できるようにします。

```typescript
test('ユーザーが削除ボタンをクリックすると削除イベントが発火する', async () => {
  // --- Arrange (準備) ---
  const user = UserBuilder.default().withName('Test User').build();
  // Nuxt 4/3 では mountSuspended を使用して非同期コンポーネントに対応
  const wrapper = await mountSuspended(UserCard, { props: { user } });

  // --- Act (実行) ---
  await wrapper.find('.c-button--delete').trigger('click');

  // --- Assert (検証) ---
  expect(wrapper.emitted('delete')).toBeTruthy();
  expect(wrapper.emitted('delete')![0]).toEqual([user.id]);
});
```

### 5.5. Builder パターンによるテストデータ生成

テストデータの「設定（Setup）」を簡略化し、テストの意図を際立たせるため Builder パターンを採用します。

- **ルール:** `EntityNameBuilder` クラスを作成し、`default()` メソッドで有効な最小限のデータを生成する。
- **メリット:** 必須項目が増えた際も Builder の修正のみで全テストを通せるため、仕様変更に強い。

```typescript
// 使用例
const adminUser = UserBuilder.default()
  .withId(100)
  .withRole('admin') // 必要な差分（テストに関係ある項目）のみを指定
  .build();
```

### 5.6. テストケースの分類

`describe` ブロックを用いて、以下の 3 観点でテストを整理します。

| 分類 | 観点 | 内容の例 |
| :--- | :--- | :--- |
| 正常系 (Normal) | 基本機能 | 正しい入力で期待通りに保存・遷移ができるか。 |
| 準正常系 (Semi-normal) | バリデーション等 | 境界値（文字数制限等）、重複エラー、権限不足のメッセージ表示。 |
| 異常系 (Abnormal) | システムエラー | API 500 エラー、タイムアウト、オフライン時のフォールバック処理。 |
