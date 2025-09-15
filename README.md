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

## WordPress Setup Guide

This guide will help you set up your WordPress site with WooCommerce and GraphQL for seamless integration. Follow the steps below carefully to ensure a successful configuration.

### Step 1: Install Required Plugins

To begin, make sure the following plugins are installed and activated on your WordPress site:

- [**WooCommerce**](https://woocommerce.com/): The essential plugin for creating an e-commerce store.
- [**WPGraphQL**](https://www.wpgraphql.com/): Enables GraphQL support for WordPress.
- [**WPGraphQL CORS**](https://github.com/funkhaus/wp-graphql-cors): Allows Cross-Origin Resource Sharing for WPGraphQL.
- [**WPGraphQL WooCommerce (WooGraphQL)**](https://github.com/wp-graphql/wp-graphql-woocommerce): Adds WooCommerce-specific GraphQL functionalities.

> **Tip:** You can install these plugins directly from the WordPress Plugin Repository or upload them manually if you have the plugin files.

### Step 2: Upload Product Data

To populate your WooCommerce store with product data, follow these steps:

1. Download the product data files from [this link](https://github.com/zackha/nuxtcommerce/raw/refs/heads/master/public/products.zip). The zip file contains both variable and variation product CSV files.
2. Navigate to the WooCommerce admin panel.
3. Go to **Products > Import**, then upload the CSV files from the downloaded zip.
4. Follow the on-screen instructions to map the CSV columns to WooCommerce fields and complete the import.

> **Note:** Ensure your CSV files are properly formatted to avoid errors during the import process.

### Step 3: Configure WPGraphQL

1. Navigate to **WPGraphQL > Settings** in the WordPress admin dashboard.
2. Locate the **GraphQL Endpoint URL** and copy it. The default endpoint is typically `/graphql`.
3. Open your project’s `.env` file and add the following line:

   ```env
   GQL_HOST=<your_graphql_endpoint_url>
   ```

   Replace `<your_graphql_endpoint_url>` with the copied URL from WPGraphQL settings.

> **Important:** Make sure your server allows CORS (Cross-Origin Resource Sharing) to enable communication between your WordPress backend and frontend application.

By following these steps, your WordPress site will be ready to integrate WooCommerce with GraphQL. For additional troubleshooting or advanced customization, refer to the official documentation of each plugin.

## Contributing

Contributions of any kind are welcome! You can open an issue for requests, bug reports, or general feedback, or you can directly create a pull request(PR).

## Contact

Don't hesitate to get in touch if you have any questions or suggestions:

Email: zckhtln@icloud.com</br>
Twitter: [@ZHatlen](https://twitter.com/ZHatlen)
