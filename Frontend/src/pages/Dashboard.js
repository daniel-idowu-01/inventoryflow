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
  labels: ["Apple", "Knorr", "Shoop", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [0, 1, 5, 8, 9, 15],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
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

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchStoresData();
    fetchProductsData();
    fetchMonthlySalesData();
  }, []);

  // Fetching total sales amount
  const fetchTotalSaleAmount = () => {
    fetch(
      `http://localhost:4000/api/sales/get/${authContext.user}/totalsaleamount`
    )
      .then((response) => response.json())
      .then((datas) => setSaleAmount(datas.totalSaleAmount));
  };

  // Fetching total purchase amount
  const fetchTotalPurchaseAmount = () => {
    fetch(
      `http://localhost:4000/api/purchase/get/${authContext.user}/totalpurchaseamount`
    )
      .then((response) => response.json())
      .then((datas) => setPurchaseAmount(datas.totalPurchaseAmount));
  };

  // Fetching all stores data
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setStores(datas));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setProducts(datas))
      .catch((err) => console.log(err));
  };

  // Fetching Monthly Sales
  const fetchMonthlySalesData = () => {
    fetch(`http://localhost:4000/api/sales/getmonthly`)
      .then((response) => response.json())
      .then((datas) => updateChartData(datas.salesAmount))
      .catch((err) => console.log(err));
  };

  // data to display as dashboard stats
  const dashboardStats = [
    {
      id: 1,
      title: 'Sales',
      amount: '$240.94',
      info: `$${saleAmount}`,
      icon: <MdOutlineInventory2 />,
      percent: '67.81%',
      bgColor: 'bg-[#344767]',
      textColor: 'text-green-600',
    },
    {
      id: 2,
      title: 'Purchase',
      amount: '$404.32',
      info: `$${purchaseAmount}`,
      icon: <ImStatsBars />,
      percent: '5.1%',
      bgColor: 'bg-blue-500',
      textColor: 'text-red-600'
    },
    {
      id: 3,
      title: 'Total Stores',
      amount: '',
      info: stores.length,
      icon: <FaStoreAlt />,
      percent: '7.3%',
      bgColor: 'bg-green-500',
      textColor: 'text-red-600'
    },
    {
      id: 4,
      title: 'Total Products',
      amount: '',
      info: products.length,
      icon: <FiUserPlus />,
      percent: '37.9%',
      bgColor: 'bg-pink-500',
      textColor: 'text-red-600'
    },
  ]
  return (
    <>
      <div
        className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4  p-4"
      >
        {dashboardStats.map(stat => (
          <StatsComp key={stat.id} {...stat} />
        ))}


        <div className="flex justify-around bg-white rounded-lg py-8 col-span-full">
          <div>
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
              width="500"
            />
          </div>
          <div>
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
