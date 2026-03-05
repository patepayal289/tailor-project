"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost/tailor-system/api/get_orders.php")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-fuchsia-700 mb-8">
        Orders
      </h1>

      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.customer_name}</td>
                <td className="p-2">{order.phone}</td>
                <td className="p-2">₹ {order.total_amount}</td>
                <td className="p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}