"use client";

import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const AdminDashboard = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/buy/getEvent");  
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);

    const chartData = {
        labels: ["Total Revenue", "Total Tickets Sold"],
        datasets: [
            {
                label: "Admin Dashboard",
                data: [data?.totalRevenue / 100, data?.totalTicketsSold],
                backgroundColor: ["#FF5733", "#33A1FF"], 
            },
        ],
    };

    const doughnutData = {
        labels: ["Total Revenue", "Total Tickets Sold", "Remaining"],
        datasets: [
            {
                data: [data?.totalRevenue / 100, data?.totalTicketsSold, (data?.totalRevenue - data?.totalTicketsSold) / 100],
                backgroundColor: ["#FF5733", "#33A1FF", "#FFC300"],
            },
        ],
    };

    const lineChartData = {
        labels: data?.users?.map((user: any) => user.name),
        datasets: [
            {
                label: "Total Sales per User",
                data: data?.users?.map((user: any) => user.num_of_tickets * user.price_of_ticket),
                fill: false,
                backgroundColor: "#33FF57",
                borderColor: "#33FF57",
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <div className="w-1/5 p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
                    Quản Lý Doanh Thu
                </h1>

                <div className="bg-white p-5 shadow-2xl rounded-xl mb-3 transform hover:scale-105 transition-all duration-300">
                    <h2 className="text-xl text-green-500 mb-2">Tổng Doanh Thu:</h2>
                    <h2 className="font-bold text-3xl text-teal-500 text-center">{data?.totalRevenue}</h2>
                </div>
                <div className="bg-white p-5 shadow-2xl rounded-xl mb-8 transform hover:scale-105 transition-all duration-300">
                    <h2 className="text-xl text-green-500 mb-2">Tổng Số Vé Đã Bán:</h2>
                    <h2 className="font-bold text-3xl text-teal-500 text-center">{data?.totalTicketsSold}</h2>
                </div>
            </div>

            <div className="w-4/5 p-6 space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Biểu Đồ Doanh Thu</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-8 shadow-xl rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <h2 className="font-semibold text-red-700 mb-2 text-lg">Biểu Đồ Cột - Tổng Doanh Thu và Vé Bán</h2>
                        {data ? (
                            <Bar data={chartData} width={150} height={150} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <div className="bg-white p-8 shadow-xl rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <h2 className="font-semibold mb-2 text-blue-700 text-lg">Tỉ Lệ Doanh Thu và Vé Bán</h2>
                        {data ? (
                            <Doughnut data={doughnutData} width={150} height={150} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <div className="bg-white p-8 shadow-xl rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <h2 className="font-semibold mb-2 text-green-700 text-lg">Biểu Đồ Đường - Doanh Thu Mỗi Người Dùng</h2>
                        {data ? (
                            <Line data={lineChartData} width={150} height={150} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông Tin Hóa Đơn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {data?.users?.map((user: any, index: number) => (
                        <div
                            key={index}
                            className="bg-gradient-to-r from-white to-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center space-y-6">
                                <div className="w-24 h-24 rounded-full bg-green-200 flex justify-center items-center">
                                    <span className="text-2xl font-semibold text-gray-800">{user.name[0]}</span>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800 text-center">{user.name}</h4>
                                <p className="text-sm text-gray-500">Email: {user.email}</p>
                                <p className="text-sm text-gray-500">Số Vé: {user.num_of_tickets}</p>
                                <p className="text-sm text-gray-500">ID Sự Kiện: {user.event_id}</p>
                                <p className="text-sm text-gray-500">ID Hóa Đơn: {user._id}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
