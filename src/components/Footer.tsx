import { Space, Typography } from "antd";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <Typography.Title level={5} className="!text-white !text-center">
        Copyright © 2021<Link href="/"> Cryptoverse Inc.</Link>
        <br />
        All Rights Reserved.
      </Typography.Title>
      <Space>
        <Link href="/">Home</Link>
        <Link href="/exchanges">Exchanges</Link>
        <Link href="/news">News</Link>
      </Space>
    </>
  );
};

export default Footer;
