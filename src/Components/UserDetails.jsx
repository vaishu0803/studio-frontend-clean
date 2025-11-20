import React, { useState } from 'react';
import { API_BASE_URL } from "../config";


const UserDetails = ({ globalSelections, calculateTotal, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    note: '',
    agreed: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreed) {
      alert("Please agree to the terms before submitting.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/send-quotation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          event_date: formData.weddingDate,
          note: formData.note,
          selections: globalSelections,
          total: calculateTotal()
        })
      });

      if (!response.ok) throw new Error("Failed to send");

      setSubmitted(true);
    } catch (error) {
      console.error(" Error sending data:", error);
      alert("Failed to send. Check your server connection.");
    }
  };

  return (
    <div className="bg-[#FAF8F3] shadow-md rounded-xl p-8 w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-[#B22222] text-center">Your Contact Details</h2>

      {submitted ? (
        <>
          <div className="bg-green-100 text-green-800 p-4 rounded mb-6 text-center">
             Thank you! We’ve received your details and will contact you shortly.
          </div>
          <div className="text-center">
            <button
              className="mt-4 bg-[#8B0000] text-[#C0A060] px-4 py-2 rounded hover:bg-[#A31621] hover:text-white"
              onClick={() => window.location.href = '/'}
            >
              Go to Home
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Your Name", type: "text", key: "name" },
            { label: "Email", type: "email", key: "email" },
            { label: "Phone Number", type: "tel", key: "phone" },
            { label: "Wedding Date", type: "date", key: "weddingDate" },
          ].map(({ label, type, key }) => (
            <div key={key} className="flex flex-col">
              <label className="text-left mb-1 text-sm font-medium text-[#B22222]">{label}</label>
              <input
                type={type}
                className="border border-gray-300 rounded-lg px-4 py-2 text-black"
                required={key !== "weddingDate"}
                value={formData[key]}
                onChange={e => setFormData({ ...formData, [key]: e.target.value })}
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-left mb-1 text-sm font-medium text-[#B22222]">Note (Optional)</label>
            <textarea
              className="border border-gray-300 rounded-lg px-4 py-2 h-24 text-black"
              value={formData.note}
              onChange={e => setFormData({ ...formData, note: e.target.value })}
            />
          </div>

          <p className="text-sm text-gray-600">
            Please review your selections and total cost before submitting. We’ll use this info to tailor our package just for you!
          </p>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.agreed}
              onChange={e => setFormData({ ...formData, agreed: e.target.checked })}
            />
            <span className="text-sm text-gray-600">I agree to the terms and conditions</span>
          </label>
          
          <div className="text-right mt-0.5">
            <button
              type="submit"
              className="bg-[#8B0000] text-[#C0A060] px-4 py-2 rounded hover:bg-[#A31621] hover:text-white"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {!submitted && (
        <div className="text-left mt-0.5">
          <button 
            onClick={onBack} 
            className="bg-[#8B0000] text-[#C0A060] px-4 py-2 rounded hover:bg-[#A31621] hover:text-white"
          >
            ← Back to Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
