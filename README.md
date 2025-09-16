<p align="center">
  <a href="https://commerce.nuxt.dev">
    <img alt="NuxtCommerce - Headless storefront for Woocommerce" src="https://github.com/user-attachments/assets/1c6720b7-5aea-4f6b-be55-8944fb81799a">
  </a>

  <h1 align="center">NuxtCommerce</h2>

  <p align="center">
    An open-source, dynamic e-commerce solution powered by Nuxt 3 and GraphQL, headless storefront replacement for Woocommerce. Featuring a user interface in the style of Pinterest and fully customizable (Vue, Nuxt3).
    <br />
    <br />
    <a href="https://commerce.nuxt.dev"><strong>🚀 Live Demo</strong></a>
  </p>
</p>

## We Love Our Stars ⭐⭐⭐⭐⭐

Thanks to the following people who have given us a star on our repo:
[![Stargazers repo roster for @zackha/nuxtcommerce](https://reporoster.com/stars/dark/zackha/nuxtcommerce#gh-dark-mode-only)](https://github.com/zackha/nuxtcommerce/stargazers)

## Introduction

NuxtCommerce is a dynamic and lively e-commerce platform developed with Nuxt 3. Developed for WooCommerce, NuxtCommerce optimizes data flow with [WPGraphQL](https://github.com/wp-graphql/wp-graphql), offering an efficient shopping experience. It stands out with its Pinterest-style user-friendly interface and fashion-oriented structure. With its dark mode feature and open-source nature, it offers flexibility and continuous development opportunities.

If your product stocks and prices are not changeable, and you are not continuously uploading new products, it could be beneficial for you to opt for [Woonuxt](https://github.com/scottyzen/woonuxt#readme). This project, developed by [scottyzen](https://github.com/scottyzen), is static, thus providing a faster solution.

## Stack

- Nuxt3 / Vue
- Headless Storefront
- GraphQL with Apollo Client
- NUXT UI / Tailwind CSS
- Pinterest Interface
- Developed for WooCommerce
- Dynamic
- Open Source
- Suitable for Fashion Category
- Dark Mode
- UI Lab

## Installation

To get started with NuxtCommerce, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/nuxtcommerce.git
   cd nuxtcommerce
   ```

2. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

   ```sh
   pnpm install
   ```

3. **Set up environment variables:**

   Create a .env file in the root directory and add the following variables:

   ```sh
   GQL_HOST=https://your-woocommerce-site.com/graphql
   ```

4. **Run the development server:**

   ```sh
   pnpm run dev
   ```

   Your application should now be running on [http://localhost:3000](http://localhost:3000).

# WordPress + WooCommerce + WPGraphQL Setup

> This project uses **WordPress + WooCommerce** as the headless backend and **WPGraphQL** (+ WooGraphQL) as the API layer consumed by the Nuxt app. Follow the steps below carefully.

## 1) Fresh WordPress install (quick checklist)

1. Install WordPress on your host (or local with e.g. Local, MAMP, Docker).
2. Log in to `/wp-admin`.
3. Go to **Settings → General** and set:

   - Site Language, Timezone, Date/Time format
   - Ensure **WordPress Address** and **Site Address** use **https\://** in production

4. Go to **Settings → Permalinks** and choose **Post name**.

   > **Important:** Pretty permalinks are required for `/graphql` to work reliably.

---

## 2) Required plugins

Install and activate the following:

- [**WooCommerce**](https://woocommerce.com/) – core e-commerce
- [**WPGraphQL**](https://www.wpgraphql.com/) – GraphQL API for WordPress
- [**WPGraphQL WooCommerce (WooGraphQL)**](https://github.com/wp-graphql/wp-graphql-woocommerce) – WooCommerce schema for WPGraphQL
- **(Optional but useful)** Regenerate Thumbnails – to rebuild image sizes after changes

You can install from the Plugins menu or upload ZIPs if needed.

## 3) WooCommerce onboarding

Open **WooCommerce → Settings** and complete these tabs:

- **General**

  - Store Address, Selling/Shipping locations, Default Customer Location
  - Currency options (e.g., NOK, EUR, USD)

- **Products**

  - Enable/disable reviews as you prefer
  - (Optional) Measurements: weight/unit, dimensions

- **Tax** (if applicable)

  - Enable taxes and set classes/rates

- **Shipping**

  - Create at least one **Shipping Zone** and **Method** (e.g., “Flat rate”)

- **Payments**

  - Enable **Cash on Delivery** (COD) to match the demo checkout in this repo:

    - _Payments → Cash on delivery → Enable_

  - You can add online gateways (Stripe, PayPal, Vipps, etc.) later

- **Accounts & Privacy**

  - Decide whether guest checkout is allowed

- **Advanced**

  - REST API settings are not required here; GraphQL is a separate endpoint

> The sample checkout in this project posts `paymentMethod: 'cod'`. Make sure COD is enabled to test end-to-end quickly.

## 4) Product attributes & taxonomies (important for GraphQL schema)

This project expects product attributes that match the GraphQL fields used in queries:

- **Color** → attribute slug `pa_color` (used via `allPaColor`)
- **Style** → attribute slug `pa_style` (used via `allPaStyle`)

Create them in **Products → Attributes**:

1. Add **Color** (`slug: color` → WooCommerce will store as taxonomy `pa_color`).
2. Add **Style** (`slug: style` → taxonomy `pa_style`).
3. Add **Size** if you plan to manage sizes (`slug: size` → `pa_size`).

For each attribute, **Configure terms** (e.g., Color: Red/Blue/Black, Style: Casual/Sport, etc.).

## 5) Import products (CSV) or create manually

### CSV Import (recommended for quick demo)

1. Download the product data files from [this link](https://github.com/zackha/nuxtcommerce/raw/refs/heads/master/public/products.zip). The zip file contains both variable and variation product CSV files.
2. Go to **Products → All Products → Import**.
3. Upload the CSV(s), map columns carefully:

   - Product Type: **variable** for parent products
   - Attributes must map to `pa_color`, `pa_style`.
   - Variations CSV must reference the correct parent

4. Complete the import wizard.

> After import, ensure products are **Published**, **In Stock**, and have **Prices**.

## 6) Media sizes (thumbnails & large)

The frontend queries use image sizes like:

- `WOOCOMMERCE_THUMBNAIL` (WooCommerce thumbnail)
- `LARGE` (WordPress large)

To get crisp images:

1. Go to **WooCommerce → Settings → Products → Display** _(or Appearance → Customize → WooCommerce)_ and confirm your **thumbnail** dimensions.
2. Go to **Settings → Media** for **Large** size dimensions.
3. If you changed dimensions or imported images, run **Tools → Regenerate Thumbnails**.

## 7) Connect frontend to backend

In your Nuxt project, create `.env`:

```bash
GQL_HOST=https://your-woocommerce-site.com/graphql
```

This is read by `runtimeConfig.gqlHost` and used by the server utility that proxies and caches GraphQL calls.

## 🙌 Contributors & Acknowledgements

We sincerely thank everyone who has contributed to **NuxtCommerce**.
Your support, feedback, and ideas keep this project moving forward. 🚀

✨ **Special thanks**

| Collaborator |
| :----------: |
| [<img src="https://github.com/rikp777.png?size=115" width=115><br><sub>@rikp777</sub>](https://github.com/rikp777) |

<sub>More contributors will be highlighted here as the project grows.</sub>

## Contact

Don't hesitate to get in touch if you have any questions or suggestions:

Email: zckhtln@icloud.com</br>
Twitter: [@ZHatlen](https://twitter.com/ZHatlen)
