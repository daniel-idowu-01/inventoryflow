import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import StatsComp from "../components/StatsComp";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import { FaStoreAlt } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["Shoe", "Phone", "Tie", "T-shirt", "Crocs", "Durag"],
  datasets: [
    {
      label: "# of Votes",
      data: [0, 1, 5, 8, 9, 15],
      backgroundColor: [
        "#339933",
        "#F7CA51",
        "#F7CA51",
        "#007ACC",
        "#9D38BD",
        "#D7D7D7",
      ],
      borderColor: [
        "#339933",
        "#F7CA51",
        "#F7CA51",
        "#007ACC",
        "#9D38BD",
        "#D7D7D7",
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  const [saleAmount, setSaleAmount] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "series",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  const authContext = useContext(AuthContext);

  // data to display as dashboard stats
  const dashboardStats = [
    {
      id: 1,
      title: "Sales",
      amount: "$240.94",
      info: `$${saleAmount || "0.00"}`,
      icon: <MdOutlineInventory2 />,
      percent: "67.81%",
      bgColor: "bg-[#344767]",
      textColor: "text-green-600",
    },
    {
      id: 2,
      title: "Purchase",
      amount: "$404.32",
      info: `$${purchaseAmount || "0.00"}`,
      icon: <ImStatsBars />,
      percent: "5.1%",
      bgColor: "bg-blue-500",
      textColor: "text-red-600",
    },
    {
      id: 3,
      title: "Total Stores",
      amount: "",
      info: stores.length,
      icon: <FaStoreAlt />,
      percent: "7.3%",
      bgColor: "bg-green-500",
      textColor: "text-red-600",
    },
    {
      id: 4,
      title: "Total Products",
      amount: "",
      info: products.length,
      icon: <FiUserPlus />,
      percent: "37.9%",
      bgColor: "bg-pink-500",
      textColor: "text-red-600",
    },
  ];

  useEffect(() => {
    // Update Chart Data
    const updateChartData = (salesData) => {
      setChart({
        ...chart,
        series: [
          {
            name: "Monthly Sales Amount",
            data: [...salesData],
          },
        ],
      });
    };

    // Fetching total sales amount
    const fetchTotalSaleAmount = () => {
      fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/sales/get/${authContext.user}/totalsaleamount`
      )
        .then((response) => response.json())
        .then((datas) => setSaleAmount(datas.totalSaleAmount));
    };

    // Fetching total purchase amount
    const fetchTotalPurchaseAmount = () => {
      fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/purchase/get/${authContext.user}/totalpurchaseamount`
      )
        .then((response) => response.json())
        .then((datas) => setPurchaseAmount(datas.totalPurchaseAmount));
    };

    // Fetching all stores data
    const fetchStoresData = () => {
      fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/store/get/${authContext.user}`
      )
        .then((response) => response.json())
        .then((datas) => setStores(datas));
    };

    // Fetching Data of All Products
    const fetchProductsData = () => {
      fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/product/get/${authContext.user}`
      )
        .then((response) => response.json())
        .then((datas) => setProducts(datas))
        .catch((err) => console.log(err));
    };

    // Fetching Monthly Sales
    const fetchMonthlySalesData = () => {
      fetch(`${process.env.REACT_APP_BACKEND_API}/api/sales/getmonthly`)
        .then((response) => response.json())
        .then((datas) => updateChartData(datas.salesAmount))
        .catch((err) => console.log(err));
    };

    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchStoresData();
    fetchProductsData();
    fetchMonthlySalesData();
  }, [authContext.user, chart]);

  return (
    <>
      <div className="col-span-12 lg:col-span-10 p-4">
        <article className="flex justify-between w-full col-span-full gap-3">
          {dashboardStats.map((stat) => (
            <StatsComp key={stat.id} {...stat} />
          ))}
        </article>

        <article className="flex flex-col sm:flex-row gap-3 justify-between col-span-full mt-10">
          <div className="bg-white p-8 shadow-md rounded-xl">
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
              className="w-full md:w-[600px]"
            />
          </div>
          <div className="bg-white p-8 shadow-md rounded-xl px-auto w-full">
            <Doughnut data={data} className="mx-auto" />
          </div>
        </article>
      </div>
    </>
  );
}

export default Dashboard;
