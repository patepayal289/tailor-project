"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export default function MeasurementsPage() {

  const API = "https://tailor-admin.great-site.net/api/api.php?action=";

  const [form, setForm] = useState<any>({
    customer_name: "",
    chest: "",
    waist: "",
    shoulder: "",
    sleeve_length: "",
    shirt_length: "",
    neck: "",
    hip: "",
    thigh: "",
    bottom_length: "",
  });

  const [history, setHistory] = useState<any[]>([]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ============================= */
  /* FETCH HISTORY */
  /* ============================= */

  const fetchHistory = async () => {
    try {
      const res = await fetch(API + "get_measurements");
      const data = await res.json();
      setHistory(data || []);
    } catch (err) {
      console.log("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  /* ============================= */
  /* SAVE MEASUREMENT */
  /* ============================= */

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {

      const res = await fetch(API + "save_measurement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {

        setForm({
          customer_name: "",
          chest: "",
          waist: "",
          shoulder: "",
          sleeve_length: "",
          shirt_length: "",
          neck: "",
          hip: "",
          thigh: "",
          bottom_length: "",
        });

        fetchHistory();

      } else {
        alert(data.error || "Save failed");
      }

    } catch (err) {
      console.log("Save error", err);
    }
  };

  /* ============================= */
  /* DELETE */
  /* ============================= */

  const deleteMeasurement = async (id: number) => {
    try {

      const res = await fetch(API + "delete_measurement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        fetchHistory();
      } else {
        alert("Delete failed");
      }

    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  /* ============================= */
  /* EXPORT EXCEL */
  /* ============================= */

  const exportExcel = () => {

    const ws = XLSX.utils.json_to_sheet(history);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Measurements");

    XLSX.writeFile(wb, "measurements.xlsx");

  };

  /* ============================= */
  /* EXPORT PDF */
  /* ============================= */

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.text("Measurement History", 14, 15);

    let y = 25;

    history.forEach((item: any) => {

      doc.text(
        `${item.customer_name} | Chest:${item.chest} | Waist:${item.waist}`,
        14,
        y
      );

      y += 10;

    });

    doc.save("measurements.pdf");

  };

  return (
    <div className="p-4 md:p-8">

      <h1 className="text-2xl md:text-3xl font-bold text-fuchsia-700 mb-6">
        Tailor Measurements
      </h1>

      {/* FORM */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {Object.keys(form).map((field) => (

              <div key={field}>

                <label className="block text-sm mb-1 capitalize">
                  {field.replace("_", " ")}
                </label>

                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />

              </div>

            ))}

          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-fuchsia-700 to-purple-800 text-white py-3 rounded-lg font-semibold"
          >
            Save Measurement
          </button>

        </form>

      </div>

      {/* HISTORY */}

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">

          <h2 className="text-lg font-semibold">
            Measurement History
          </h2>

          <div className="flex gap-2">

            <button
              onClick={exportExcel}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm"
            >
              Export Excel
            </button>

            <button
              onClick={exportPDF}
              className="bg-red-600 text-white px-4 py-2 rounded text-sm"
            >
              Export PDF
            </button>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full text-xs md:text-sm">

            <thead className="bg-fuchsia-700 text-white">

              <tr>
                <th className="p-2">Customer</th>
                <th className="p-2">Chest</th>
                <th className="p-2">Waist</th>
                <th className="p-2">Shoulder</th>
                <th className="p-2">Sleeve</th>
                <th className="p-2">Shirt</th>
                <th className="p-2">Neck</th>
                <th className="p-2">Hip</th>
                <th className="p-2">Thigh</th>
                <th className="p-2">Bottom</th>
                <th className="p-2">Delete</th>
              </tr>

            </thead>

            <tbody>

              {history.map((item) => (

                <tr key={item.id} className="border-b">

                  <td className="p-2">{item.customer_name}</td>
                  <td className="p-2">{item.chest}</td>
                  <td className="p-2">{item.waist}</td>
                  <td className="p-2">{item.shoulder}</td>
                  <td className="p-2">{item.sleeve_length}</td>
                  <td className="p-2">{item.shirt_length}</td>
                  <td className="p-2">{item.neck}</td>
                  <td className="p-2">{item.hip}</td>
                  <td className="p-2">{item.thigh}</td>
                  <td className="p-2">{item.bottom_length}</td>

                  <td className="p-2">

                    <button
                      onClick={() => deleteMeasurement(item.id)}
                      className="text-red-600 text-xs"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}