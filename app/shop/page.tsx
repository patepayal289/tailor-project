"use client";
import { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    fetch("http://localhost/tailor-system/api/get_products.php")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handlePayment = () => {
    if (!form.customer_name || !form.phone || !form.city) {
      alert("Please fill all details");
      return;
    }

    const options = {
      key: "rzp_test_SMglNFBxeOqaHN", // replace with your key
      amount: selectedProduct.price * 100,
      currency: "INR",
      name: "Payal Boutique",
      description: selectedProduct.name,
      handler: async function (response: any) {

        await fetch(
          "http://localhost/tailor-system/api/save_order.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customer_name: form.customer_name,
              phone: form.phone,
              address: form.city,
              total_amount: selectedProduct.price,
              payment_id: response.razorpay_payment_id,
              items: [
                {
                  name: selectedProduct.name,
                  price: selectedProduct.price,
                  quantity: 1,
                },
              ],
            }),
          }
        );

        alert("Order Placed Successfully!");
        setSelectedProduct(null);
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-6 md:p-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-fuchsia-700 mb-12">
        Our Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-60 w-full object-cover transform hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-fuchsia-700 font-bold mt-2">
                ₹ {product.price}
              </p>

              <button
                onClick={() => setSelectedProduct(product)}
                className="mt-4 bg-fuchsia-700 text-white px-6 py-2 rounded-full"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE FRIENDLY MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 md:p-8">

            <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-fuchsia-700">
              Complete Your Order
            </h3>

            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-fuchsia-600"
              onChange={(e) =>
                setForm({ ...form, customer_name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-fuchsia-600"
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="City"
              className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-fuchsia-600"
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />

            <button
              onClick={handlePayment}
              className="bg-fuchsia-700 text-white w-full py-3 rounded-full hover:bg-fuchsia-800 transition"
            >
              Pay ₹ {selectedProduct.price}
            </button>

            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 text-gray-500 w-full"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
}