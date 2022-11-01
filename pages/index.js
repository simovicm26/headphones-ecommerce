import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";

function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export const getStaticProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const BannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(BannerQuery);

  return {
    props: { products, bannerData },
    revalidate: 30,
  };
};

export default Home;
