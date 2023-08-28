import { Suspense } from "react";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import Loader from "./Loader";

type CoinHistory = {
  change: number;
  history: {
    price: string;
    timestamp: number;
  }[];
};

const Line = ({
  coinHistory,
  coinName,
}: {
  coinHistory: CoinHistory;
  coinName: string;
}) => {
  let pairedData = coinHistory.history.map((item) => ({
    x: item.timestamp * 1000,
    y: Number(item.price),
  }));

  // let color =
  //   Number(coinHistory.history[coinHistory.history.length - 1].price) -
  //     Number(coinHistory.history[0].price) >
  //   0
  //     ? "#26C281"
  //     : "#F44336";

  const options = {
    colors: ["#0071bd"],
    // title: {
    //   text: `${coinName} Price Chart`,
    //   align: "center",
    //   style: {
    //     fontSize: "24px",
    //     fontWeight: "black",
    //   },
    // },
    // subtitle: {
    //   text: `Change: ${coinHistory?.change}%`,
    //   align: "left",
    //   style: {
    //     fontSize: "18px",
    //     fontWeight: "black",
    //   },
    // },
    stroke: {
      curve: "smooth" as const,
    },
    chart: {
      id: "coin price data",
      animations: {
        enabled: true,
        easing: "easeinout" as const,
        speed: 1300,
      },
      zoom: {
        autoScaleYaxis: true,
      },
    },
    xaxis: {
      type: "datetime" as const,
      label: {
        dateTimeUTC: false,
      },
    },
    yaxis: {
      tickAmount: 4,
      floating: false,
      title: {
        text: "Price In USD",
      },
      min: 0,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: function (y: number) {
          if (typeof y !== "undefined") {
            return "$" + y;
          }
          return y;
        },
      },
      x: {
        format: "MMM dd HH:MM",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  const series = [
    {
      data: pairedData,
      name: coinName,
    },
  ];

  return (
    <ApexChart options={options} series={series} type="area" width="100%" />
  );
};

export default Line;
