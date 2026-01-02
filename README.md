# Nuxt ミニマルスターター

詳しくは [Nuxt ドキュメント](https://nuxt.com/docs/getting-started/introduction) をご覧ください。

## Dockerを使用した開発環境の立ち上げ（推奨）

Dockerを使用することで、簡単に開発環境を立ち上げることができます。

### 前提条件

*   Docker Desktop または同等のDocker環境がインストールされていること。

### 起動方法

以下のコマンドを実行して、開発サーバーを起動します。

```bash
docker compose up
```

起動後、ブラウザで `http://localhost:3000` にアクセスしてください。
ソースコードの変更は自動的に反映されます（ホットリロード）。

停止するには `Ctrl+C` を押すか、別ターミナルで以下を実行します。

```bash
docker compose down
```

---

## ローカルでのセットアップ（Dockerを使用しない場合）

依存関係をインストールしてください：

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 開発サーバー

`http://localhost:3000` で開発サーバーを起動します：

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### 本番ビルド

本番用にアプリケーションをビルドします：

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

本番ビルドをローカルでプレビューします：

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

詳しくは [デプロイメントのドキュメント](https://nuxt.com/docs/getting-started/deployment) をご確認ください。
