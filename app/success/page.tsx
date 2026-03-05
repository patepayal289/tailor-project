export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you for shopping with Payal Boutique.
      </p>

      <a
        href="/measurement"
        className="bg-fuchsia-700 text-white px-6 py-3 rounded-full"
      >
        Continue to Measurement
      </a>
    </div>
  );
}