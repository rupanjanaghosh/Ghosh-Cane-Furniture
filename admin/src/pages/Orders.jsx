import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // 🧠 Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (data.success) {
        setOrders(data.orders.reverse());
      } else {
        toast.error(data.message || "Failed to load orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  };

  // 🔄 Update order status
  const handleStatusChange = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Order status updated");
        fetchAllOrders();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Orders</h3>

      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-lg shadow-sm"
            >
              {/* Parcel Icon */}
              <img
                className="w-12"
                src={assets.parcel_icon}
                alt="parcel_icon"
              />

              {/* Order Details */}
              <div>
                <div>
                  {order.items.map((item, i) => (
                    <p key={i} className="py-0.5">
                      {item.name} × {item.quantity}{" "}
                      <span className="text-gray-500">({item.size})</span>
                      {i < order.items.length - 1 && ","}
                    </p>
                  ))}
                </div>

                <p className="mt-3 mb-2 font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="text-gray-600">
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country} - {order.address.zipcode}
                  </p>
                </div>
                <p className="mt-1">📞 {order.address.phone}</p>
              </div>

              {/* Payment Info */}
              <div>
                <p className="text-sm sm:text-[15px]">
                  Items: {order.items.length}
                </p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>
                  Payment:{" "}
                  <span
                    className={`font-semibold ${
                      order.payment ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Amount */}
              <p className="text-sm sm:text-[15px] font-medium">
                {currency}
                {order.amount}
              </p>

              {/* Status Dropdown */}
              <select
                onChange={(e) => handleStatusChange(e, order._id)}
                value={order.status}
                className="p-2 font-semibold border rounded bg-gray-50 hover:bg-gray-100"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4 text-sm">
            No orders found yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
