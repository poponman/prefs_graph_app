# 都道府県別人口構成グラフアプリ

このアプリは、日本の都道府県を選択し、指定の人口構成（総人口・年少人口・生産年齢人口・老年人口）に基づく人口推移をグラフ表示するアプリケーションです。

React + TypeScript + Highcharts を用いて構築されており、API から取得した人口データを可視化します。

---

## 機能一覧

- 都道府県のチェックボックス表示と選択
- 人口構成（総人口、年少人口、生産年齢人口、老年人口）の選択
- Highcharts による人口推移グラフの描画
- カスタムフックによるデータ取得と状態管理
- エラーハンドリング・AbortController によるフェッチキャンセル対応
- Jest + Testing Library によるテスト

---

## 技術スタック

| 種別             | 内容                                   |
|------------------|----------------------------------------|
| フレームワーク   | React 18 (Vite or CRA)                 |
| 言語             | TypeScript                             |
| チャート         | Highcharts + highcharts-react-official |
| UIテスト         | React Testing Library + Jest           |
| 型定義           | 独自の `types/population.ts` を利用    |
| API              | [Yumemi 人口構成 API](https://yumemi-frontend-engineer-codecheck-api.vercel.app) |

---

## APIキーの設定
API を利用するために、プロジェクトのルートディレクトリに `.env` ファイルを作成し、以下のように記述してください
<pre> <code>.REACT_APP_API_KEY=your_api_key_here </code> </pre>

