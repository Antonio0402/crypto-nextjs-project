import { Button, Menu, Typography, Avatar } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import Image from "next/image";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Key, ReactNode, useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import logo from "../../public/cryptocurrency.png";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: ReactNode, key: Key, icon?: ReactNode): MenuItem {
  return {
    label,
    key,
    icon,
  };
}

const items: MenuItem[] = [
  getItem(<Link href="/">Home</Link>, "1", <HomeOutlined />),
  getItem(
    <Link href="/cryptocurrencies">Cryptocurrencies</Link>,
    "2",
    <FundOutlined />
  ),
  getItem(
    <Link href="/exchanges">Exchanges</Link>,
    "3",
    <MoneyCollectOutlined />
  ),
  getItem(<Link href="/news">News</Link>, "4", <BulbOutlined />),
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width && width <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [width]);

  return (
    <div className="fixed left-0 h-screen m-0 bg-slate-950 max-md:h-[9vh] max-md:w-full max-md:z-10">
      <div className="bg-slate-950 flex p-5 items-center w-full gap-4 relative">
        <Avatar
          src={
            <Image
              src={logo}
              alt="cryto-currency-logo"
              style={{ width: "auto", height: "auto" }}
            />
          }
          size="large"
          gap={8}
        />
        <Typography.Title level={2} className="!mb-0">
          <Link className="!text-white" href="/">
            Cryptoverse
          </Link>
        </Typography.Title>
      </div>
      <Button
        className="!hidden max-md:!block !absolute !right-2.5 !top-6 !text-lg !border-none"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        <MenuOutlined className="align-text-top" />
      </Button>
      {activeMenu && <Menu theme="dark" items={items}></Menu>}
    </div>
  );
};

export default Navbar;
