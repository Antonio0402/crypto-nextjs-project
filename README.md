### Overview

Crypto webiste is built using Next.js, a React framework for server-side rendering and static site generation. It is typed with Typescript and styled using Ant Design component library. Bringing a responsive, customizable layouts and components out of the box.

For state management, Redux-toolkits is chosen because of intergration of both fetching and global state mangement in one place which quite sort well with custom hooks for a multiple API project.

The intuitive chart UI is powered by Apexchart, a React component library designed for building charts. It provides responsive, customizable styles and indexes.

Together, althought the Next.Js has release stable app dir, this project is pureposely build on pages dir which works well with the needs of mainly interactive-focus on client site projects while maintain cutting-edge features and performance optimizations on routing and static rendering.

### Key Features

1. Listing and Searching 
   Find a crypto's stock market info easily with search input while browsing the top list of all crypto stock indexes
2. Responsive
   Fully responsive design optimized for all devices
3. ApexChart
   Using ApexChart in order to display statistical data in chronological order
4. SSG and SSR
   The project supports both prefetched data on static routing as well as real-time datas when searching in order to create dynamic routing whichs ensures a sleek and responsive experience.

### Installation

Clone this repo and install all dependencies

```
git clone https://github.com/Antonio0402/crypto-nextjs-project.git

cd crypto-nextjs-project

npm install
```

### Development

```
npm run dev
```

### Build

```
npm run build
```

### Screenshot

![Desktop Design](./screenshots/desktop-design.png)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
