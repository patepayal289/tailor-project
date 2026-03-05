"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    fetch("https://tailor-admin.great-site.net/api/get_orders.php")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setRevenue(data.revenue || 0);
        setPending(data.pending || 0);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-fuchsia-700 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold">₹ {revenue}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Pending Orders</h3>
          <p className="text-2xl font-bold">{pending}</p>
        </div>
      </div>
    </div>
  );
}