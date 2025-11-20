import React, { useRef } from "react";

// Summary.jsx — FINAL FIX
// ------------------------------------------------------------
// ✔ Perfect vertical + horizontal centering in all table rows
// ✔ Softer red (not too bright) using your palette
// ✔ More visible table text (darker text, better contrast)
// ✔ Buttons improved and fully responsive
// ✔ Uses exact theme palette: deepRed, headingRed, softGold, warmCream
// ------------------------------------------------------------

const Summary = ({ globalSelections, onBack, onNext }) => {
  const summaryRef = useRef(null);

  const prices = {
    'Traditional Photography': 5000,
    'Traditional Videography': 6000,
    'Candid Photography': 7000,
    'Candid Videography': 8000,
    'Cinematic Videography': 8000,
    'Drone': 3000,
    'LED Screen': 4000,
    'Candid Album - Pressbook': 6000,
    'Candid Album - Magnum': 8000,
    'Traditional Album - Pressbook': 5000,
    'Traditional Album - Magnum': 7000
  };

  const num = (v) => {
    if (v === null || v === undefined) return 0;
    if (typeof v === 'number') return v;
    if (typeof v === 'string') {
      const parsed = Number(v.replace(/[^0-9.-]+/g, ''));
      return Number.isFinite(parsed) ? parsed : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    let total = 0;
    for (const section in globalSelections) {
      const data = globalSelections[section] || {};
      if (section === 'Album') {
        for (const service in data) {
          total += num(data[service]) * (prices[service] || 0);
        }
      } else {
        for (const key in data) {
          const val = data[key];
          if (typeof val === 'number' || typeof val === 'string') {
            total += num(val) * (prices[key] || 0);
          } else if (typeof val === 'object') {
            for (const service in val) {
              total += num(val[service]) * (prices[service] || 0);
            }
          }
        }
      }
    }
    return total;
  };

  const currency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })
      .format(value)
      .replace('INR', '₹');

  // Softer + premium palette
  const palette = {
    deepRed: '#7A0000',          // softer than #8B0000
    headingRed: '#A61B1B',       // softer than #B22222
    softGold: '#C0A060',
    warmCream: '#FAF8F3',
    offWhite: '#FFFDFC',
    text: '#1C1C1C',
    buttonHover: '#8A121C'
  };

  // Perfect vertical & horizontal centering
  const CenteredCell = ({ children }) => (
    <div
      className="flex items-center justify-center text-center"
      style={{ minHeight: 50, color: palette.text }}
    >
      {children}
    </div>
  );

  return (
    <section className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8">
      <div ref={summaryRef}>
        {/* MAIN TITLE */}
        <header className="flex flex-col items-center text-center mb-6">
          <h2
            className="text-3xl font-extrabold"
            style={{ color: palette.deepRed }}
          >
            Your Quotation
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            A clear breakdown of selected services and estimated pricing.
          </p>
        </header>

        <div className="space-y-10">
          {Object.keys(globalSelections).map((event, idx) => {
            const eventData = globalSelections[event];
            if (!eventData || Object.keys(eventData).length === 0) return null;

            return (
              <div key={idx} className="border-t pt-4">
                <h3
                   className="text-xl font-semibold mb-3"
                  style={{ color: palette.headingRed }}
                >
                  {event}
                </h3>

                <div className="overflow-x-auto">
                  <table className="min-w-full table-fixed text-sm summary-table">
                    <colgroup>
                      <col style={{ width: '25%' }} />
                      <col style={{ width: '40%' }} />
                      <col style={{ width: '15%' }} />
                      <col style={{ width: '20%' }} />
                    </colgroup>

                    {/* HEADER */}
                    <thead>
  <tr style={{ background: palette.deepRed, color: '#fff' }}>
    <th className="px-4 py-3 text-center align-middle">
      <div className="flex items-center justify-center h-full">Person</div>
    </th>
    <th className="px-4 py-3 text-center align-middle">
      <div className="flex items-center justify-center h-full">Service</div>
    </th>
    <th className="px-4 py-3 text-center align-middle">
      <div className="flex items-center justify-center h-full">Qty</div>
    </th>
    <th className="px-4 py-3 text-center align-middle">
      <div className="flex items-center justify-center h-full">Price</div>
    </th>
  </tr>
</thead>

                    {/* BODY */}
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(eventData).flatMap(([personOrService, data]) => {
                        // Case 1: service → qty
                        if (typeof data === 'number' || typeof data === 'string') {
                          return (
                            <tr key={personOrService}>
                              <td className="px-4 py-3 align-middle"><CenteredCell>-</CenteredCell></td>
                              <td className="px-4 py-3 align-middle"><CenteredCell>{personOrService}</CenteredCell></td>
                              <td className="px-4 py-3 align-middle"><CenteredCell>{num(data)}</CenteredCell></td>
                              <td className="px-4 py-3 align-middle" style={{ color: palette.softGold }}>
                                <CenteredCell>
                                  {currency(num(data) * (prices[personOrService] || 0))}
                                </CenteredCell>
                              </td>
                            </tr>
                          );
                        }

                        // Case 2: person → services {}
                        return Object.entries(data).map(([service, qty]) => (
                          <tr key={service}>
                            <td className="px-4 py-3 align-middle"><CenteredCell>{personOrService}</CenteredCell></td>
                            <td className="px-4 py-3 align-middle"><CenteredCell>{service}</CenteredCell></td>
                            <td className="px-4 py-3 align-middle"><CenteredCell>{num(qty)}</CenteredCell></td>
                            <td className="px-4 py-3 align-middle" style={{ color: palette.softGold }}>
                              <CenteredCell>
                                {currency(num(qty) * (prices[service] || 0))}
                              </CenteredCell>
                            </td>
                          </tr>
                        ));
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        {/* TOTAL & BUTTONS */}
        <div className="mt-10 flex flex-col items-center gap-4">
<div className="flex-1 rounded-lg p-4" style={{ background: palette.warmCream }}>
<div className="text-sm text-gray-600">Estimated Total</div>
<div className="mt-2 text-3xl font-bold" style={{ color: palette.deepRed }}>
{currency(calculateTotal())}
</div>
</div>

         <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
<button
onClick={onBack}
 className="inline-flex items-center gap-3 bg-[#8B0000] hover:bg-[#A31621] text-white font-semibold py-3 px-8 rounded-full transition-shadow shadow-lg"
 onMouseOver={(e) => (e.currentTarget.style.background = palette.buttonHover)}
onMouseOut={(e) => (e.currentTarget.style.background = palette.deepRed)}
>
← Back
</button>


<button
onClick={onNext}
 className="inline-flex items-center gap-3 bg-[#8B0000] hover:bg-[#A31621] text-white font-semibold py-3 px-8 rounded-full transition-shadow shadow-lg"
onMouseOver={(e) => (e.currentTarget.style.background = palette.buttonHover)}
onMouseOut={(e) => (e.currentTarget.style.background = palette.deepRed)}
>
Submit Details →
</button>
</div>

        </div>
      </div>
    </section>
  );
};

export default Summary;
