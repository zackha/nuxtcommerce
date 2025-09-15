<p align="center">
  <a href="https://commerce.nuxt.dev">
    <img alt="NuxtCommerce – Headless storefront for WooCommerce" src="https://github.com/user-attachments/assets/1c6720b7-5aea-4f6b-be55-8944fb81799a">
  </a>
</p>

<h1 align="center">NuxtCommerce</h1>

<p align="center">
  A modern, headless storefront for <b>WooCommerce</b> built with <b>Nuxt 4</b> & <b>GraphQL</b>.<br/>
  Pinterest-like UX, fast-by-default with Nitro caching (SWR), image optimization, i18n, dark mode, and production-ready UI.
  <br/><br/>
  <a href="https://commerce.nuxt.dev"><b>🚀 Live Demo</b></a>
  ·
  <a href="https://github.com/zackha/nuxtcommerce/stargazers">⭐ Star</a>
  ·
  <a href="../../issues">🐞 Issues</a>
  ·
  <a href="#-contributing">🤝 Contribute</a>
</p>

<p align="center">
  <a href="https://nuxt.com"><img alt="Nuxt" src="https://img.shields.io/badge/Nuxt-4.1.2-00DC82.svg"></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-black.svg"></a>
  <a href="https://github.com/zackha/nuxtcommerce/actions"><img alt="Build" src="https://img.shields.io/badge/Build-Pass-brightgreen.svg"></a>
  <a href="https://github.com/zackha/nuxtcommerce/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/zackha/nuxtcommerce?color=yellow"></a>
  <a href="https://github.com/zackha/nuxtcommerce/network/members"><img alt="Forks" src="https://img.shields.io/github/forks/zackha/nuxtcommerce?color=blue"></a>
</p>

## We Love Our Stars ⭐⭐⭐⭐⭐

Thanks to the following people who have given us a star on our repo:
[![Stargazers repo roster for @zackha/nuxtcommerce](https://reporoster.com/stars/dark/zackha/nuxtcommerce#gh-dark-mode-only)](https://github.com/zackha/nuxtcommerce/stargazers)

## Table of Contents

- [Highlights](#-highlights)
- [Stack](#-stack)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [WordPress & WooCommerce Setup](#-wordpress--woocommerce-setup)
- [Configuration](#-configuration)
- [Data Flow & Caching](#-data-flow--caching)
- [Directory Layout](#-directory-layout)
- [Nuxt Server API](#-nuxt-server-api)
- [i18n & SEO](#-i18n--seo)
- [Deployment](#-deployment)
- [Troubleshooting & FAQ](#-troubleshooting--faq)
- [Contributing](#-contributing)
- [Maintainers & Contributors](#-maintainers--contributors)
- [License](#-license)

## ✨ Highlights

- ⚡ **Nuxt 4 + Nitro** with **`cachedEventHandler`** (SWR)
- 🛒 **Headless WooCommerce** via **WPGraphQL + WooGraphQL**
- 🧭 **Pinterest-style catalog** with infinite scroll & skeletons
- ❤️ **Wishlist** (client-side, `localStorage`)
- 🧺 **Cart & Checkout** (Woo session cookie on mutations)
- 🌙 **Dark mode** toggle, polished UI with `@nuxt/ui`
- 🌍 **i18n** (English, Norwegian Bokmål, Dutch, German)
- 🔎 **SEO**: canonical/OG/Twitter + **Product JSON-LD**
- 🖼 **Image optimization** via `@nuxt/image`
- ☁️ **NuxtHub** KV cache ready (Cloudflare Workers)

## 🧰 Stack

| Layer        | Choice                                          |
| ------------ | ----------------------------------------------- |
| Framework    | **Nuxt 4** (Vue 3, Nitro)                       |
| GraphQL      | **`nuxt-graphql-request`** / `graphql-request`  |
| UI & Styling | **`@nuxt/ui`**, Tailwind utilities              |
| Media        | **`@nuxt/image`**                               |
| UX           | **Notivue** (toasts), **VueUse**, **Swiper**    |
| i18n         | **`@nuxtjs/i18n`**                              |
| Edge         | Nitro + **SWR** cache (optional **NuxtHub** KV) |

## 🏗 Architecture

```
Client (Nuxt pages/components)
     │   $fetch()
     ▼
Nuxt Server (Nitro)
  /server/api/*.get.ts  (cachedEventHandler, SWR)
  /server/api/*.post.ts (mutations)
     │
     ├─ server/utils/wpgraphql.ts
     │     → GraphQLClient
     │     → Woo session cookie (mutations)
     ▼
WPGraphQL + WooGraphQL (WordPress + WooCommerce)
```

**Key ideas**

- Browser never talks directly to WPGraphQL.
- WooCommerce’s `woocommerce-session` cookie is **created/used on mutations** and set **HTTP-only** with SameSite=Lax.
- GET endpoints are **SWR-cached** and keyed by URL (including query string).

---

## ⚡ Getting Started

> Requirements: **Node 20+**, **pnpm**.

```bash
# 1) Clone
git clone https://github.com/zackha/nuxtcommerce.git
cd nuxtcommerce

# 2) Install
pnpm install

# 3) Configure env
cp .env.example .env
# then edit:
# GQL_HOST=https://your-woocommerce-site.com/graphql

# 4) Dev
pnpm dev
# http://localhost:3000

# (Optional) Build/Preview
pnpm build && pnpm preview
```

## 🛒 WordPress & WooCommerce Setup

1. **Install plugins**

To begin, make sure the following plugins are installed and activated on your WordPress site:

- [**WooCommerce**](https://woocommerce.com/): The essential plugin for creating an e-commerce store.
- [**WPGraphQL**](https://www.wpgraphql.com/): Enables GraphQL support for WordPress.
- [**WPGraphQL WooCommerce (WooGraphQL)**](https://github.com/wp-graphql/wp-graphql-woocommerce): Adds WooCommerce-specific GraphQL functionalities.

> **Tip:** You can install these plugins directly from the WordPress Plugin Repository or upload them manually if you have the plugin files.

2. **Import sample products**

To populate your WooCommerce store with product data, follow these steps:

1. Download the product data files from [this link](https://github.com/zackha/nuxtcommerce/raw/refs/heads/master/public/products.zip). The zip file contains both variable and variation product CSV files.
2. Navigate to the WooCommerce admin panel.
3. Go to **Products > Import**, then upload the CSV files from the downloaded zip.
4. Follow the on-screen instructions to map the CSV columns to WooCommerce fields and complete the import.

> **Note:** Ensure your CSV files are properly formatted to avoid errors during the import process.

3. **Configure WPGraphQL**

1. Navigate to **WPGraphQL > Settings** in the WordPress admin dashboard.
1. Locate the **GraphQL Endpoint URL** and copy it. The default endpoint is typically `/graphql`.
1. Open your project’s `.env` file and add the following line:

   ```env
   GQL_HOST=<your_graphql_endpoint_url>
   ```

   Replace `<your_graphql_endpoint_url>` with the copied URL from WPGraphQL settings.

By following these steps, your WordPress site will be ready to integrate WooCommerce with GraphQL. For additional troubleshooting or advanced customization, refer to the official documentation of each plugin.

## 🔁 Data Flow & Caching

### GET endpoints (SWR)

- `/api/search` → `maxAge: 60s`
- `/api/products` → `maxAge: 60s`
- `/api/product` → `maxAge: 5m`
- `/api/categories` → `maxAge: 1h`

These handlers use **`cachedEventHandler`** with **SWR** to serve hot responses while revalidating in the background. Cache keys are based on the **full request URL** (including query).

### Mutations & Session

- `/api/cart/add`, `/api/cart/update`, `/api/checkout`
- On first mutation, the Woo server returns a `woocommerce-session` header; the server sets a **HTTP-only** cookie (`SameSite: 'lax'`, `path: '/'`) for subsequent requests.
- Client cart is also persisted via `localStorage` for snappy UX.

## 🗂 Directory Layout

```
app/
  app.vue, app.config.ts           # global head/meta/theme; Notivue mount
  components/                      # AppHeader/Footer, Cart/Checkout, ProductCard, etc.
  composables/                     # useCart, useCheckout, useWishlist, useComponents
  gql/
    queries/                       # getProducts, getProduct, getSearchProducts, getCategories
    mutations/                     # addToCart, updateItemQuantities, checkout
  pages/
    index.vue                      # catalog + infinite scroll (+ sorting/category)
    product/[id].vue               # slug + sku-prefix, gallery, variations, related
    categories.vue                 # category grid
    favorites.vue                  # wishlist
server/
  api/
    products.get.ts
    product.get.ts
    search.get.ts
    categories.get.ts
    cart/add.post.ts
    cart/update.post.ts
    checkout.post.ts
  routes/
    sitemap.xml.ts
    robots.txt.ts
  utils/
    wpgraphql.ts                   # GraphQL client + Woo session handling
nuxt.config.ts
package.json
```

## 🧩 Nuxt Server API

| Endpoint           | Method | Purpose                                                             | Cache    |
| ------------------ | ------ | ------------------------------------------------------------------- | -------- |
| `/api/products`    | GET    | Paginated catalog (`after`, `search`, `category`, `order`, `field`) | 60s, SWR |
| `/api/product`     | GET    | Product by `slug` + `sku` (details, variations, related)            | 5m, SWR  |
| `/api/search`      | GET    | Quick search (first 6, in-stock)                                    | 60s, SWR |
| `/api/categories`  | GET    | Category tree (3 levels)                                            | 1h, SWR  |
| `/api/cart/add`    | POST   | Add variation to cart (establish Woo session)                       | —        |
| `/api/cart/update` | POST   | Update/remove cart items                                            | —        |
| `/api/checkout`    | POST   | Create order (COD in sample)                                        | —        |

> **Note:** Queries/mutations are defined under `app/gql/*` and proxied via `server/utils/wpgraphql.ts`.

## 🌍 i18n & SEO

- **i18n**: Localized routes (via `localePath`), English default.
- **SEO**:

  - Per-page `useHead/useSeoMeta` (title, description, canonical, OG/Twitter)
  - **Product JSON-LD** schema injection on product pages
  - `robots.txt` & `sitemap.xml` served from `server/routes`

## 🚀 Deployment

### Vercel

1. Import repo in Vercel
2. Set env var: `GQL_HOST=https://your-woocommerce-site.com/graphql`
3. Deploy

### Netlify

- Build command: `pnpm build`
- Publish directory: `.output/public`
- Env: `GQL_HOST=...`

### NuxtHub (Cloudflare Workers)

- `hub: { cache: true }` in `nuxt.config.ts`
- `pnpm deploy` (or `nuxthub deploy`)
- Set `GQL_HOST` in NuxtHub project settings

> `compatibilityDate` in `nuxt.config.ts` is already set for Workers.

## 🤝 Contributing

We welcome all contributions!

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Dev locally: `pnpm dev`
4. Commit with a clear message (Conventional Commits welcome)
5. Open a PR with screenshots if UI changes

Issues & ideas → [GitHub Issues](../../issues)

## 👥 Maintainers & Contributors

**Maintainer**

- **Sefa Bulak** — [@zackha](https://github.com/zackha) · [zackha.com](https://zackha.com)

**Contributors**

- [@rikp777](https://github.com/rikp777)

> Want to be listed here? Your first merged PR adds you to this section.

## 📜 License

**MIT** — see [LICENSE](LICENSE)

### Notes & Acknowledgements

This project is community-driven and **not affiliated** with Automattic/WooCommerce.
Built with ❤️ for modern storefronts on the Jamstack.
