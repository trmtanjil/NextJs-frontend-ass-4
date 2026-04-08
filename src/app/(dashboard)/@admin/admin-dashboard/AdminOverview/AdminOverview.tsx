/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminOverview = ({ 
  orders = [], 
  users = [], 
  medicines = [] 
}: any) => {

  // ১. অর্ডার স্ট্যাটাস অনুযায়ী পাই চার্ট ডাটা
  const orderStatusData = useMemo(() => {
    // সেফগার্ড: চেক করা হচ্ছে orders কি আসলেই অ্যারে কি না
    const safeOrders = Array.isArray(orders) ? orders : [];
    
    const statusCount = safeOrders.reduce((acc: Record<string, number>, order: any) => {
      const status = order.status || "UNKNOWN";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(statusCount).map((key) => ({
      name: key,
      value: statusCount[key],
    }));
  }, [orders]);

  // ২. ইউজার রোল অনুযায়ী বার চার্ট ডাটা
  const userRoleData = useMemo(() => {
    // সেফগার্ড: চেক করা হচ্ছে users কি আসলেই অ্যারে কি না
    const safeUsers = Array.isArray(users) ? users : [];

    const roleCount = safeUsers.reduce((acc: Record<string, number>, user: any) => {
      const role = user.role || "UNKNOWN";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(roleCount).map((key) => ({
      name: key,
      count: roleCount[key],
    }));
  }, [users]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard Overview</h1>

      {/* কুইক স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm uppercase font-semibold">Total Users</p>
          <h2 className="text-3xl font-bold text-blue-600">{Array.isArray(users) ? users.length : 0}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-gray-500 text-sm uppercase font-semibold">Total Medicines</p>
          <h2 className="text-3xl font-bold text-green-600">{Array.isArray(medicines) ? medicines.length : 0}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <p className="text-gray-500 text-sm uppercase font-semibold">Total Orders</p>
          <h2 className="text-3xl font-bold text-orange-600">{Array.isArray(orders) ? orders.length : 0}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* বার চার্ট: ইউজার রোল */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-bold mb-4 text-gray-700">User Roles Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userRoleData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* পাই চার্ট: অর্ডার স্ট্যাটাস */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-bold mb-4 text-gray-700">Order Status Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {orderStatusData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              {orderStatusData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm font-medium text-gray-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;