"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [make, setMake] = useState("");
  const [price, setPrice] = useState("");
  const [postcode, setPostcode] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [dealRating, setDealRating] = useState("");

  const marketPrices = {
    bmw: 6000,
    audi: 7000,
    ford: 3000,
    mercedes: 8000,
    volkswagen: 5000
  };

  useEffect(() => {
    const savedAlerts = localStorage.getItem("alerts");
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  const strongLinks = {
    autotrader: `https://www.autotrader.co.uk/car-search?make=${make}&price-to=${price}&postcode=${postcode}`,
    ebay: `https://www.ebay.co.uk/sch/i.html?_nkw=${make}&_udhi=${price}`,
    motors: `https://www.motors.co.uk/car-search/${make}/?price_to=${price}`,
    cargurus: `https://www.cargurus.co.uk/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?entitySelectingHelper.selectedMake=${make}&maxPrice=${price}`
  };

  const openAll = () => {
    checkDeal();
    Object.values(strongLinks).forEach((link) => {
      window.open(link, "_blank");
    });
  };

  const saveAlert = () => {
    const newAlert = { make, price, postcode };
    setAlerts([...alerts, newAlert]);
  };

  const deleteAlert = (index) => {
    const updated = alerts.filter((_, i) => i !== index);
    setAlerts(updated);
  };

  const checkDeal = () => {
    const p = parseInt(price);
    const m = make.toLowerCase();

    if (!p || !m) {
      setDealRating("");
      return;
    }

    const avg = marketPrices[m];

    if (!avg) {
      setDealRating("No data for this car yet");
      return;
    }

    if (p < avg * 0.6) {
      setDealRating("🔥 Excellent Deal");
    } else if (p < avg * 0.85) {
      setDealRating("💸 Good Deal");
    } else if (p <= avg * 1.1) {
      setDealRating("👍 Fair Price");
    } else {
      setDealRating("❌ Overpriced");
    }
  };

  return (
    <div style={{
      backgroundColor: "#0f172a",
      color: "white",
      minHeight: "100vh",
      padding: "20px"
    }}>
      {/* HEADER */}
      <h1 style={{ textAlign: "center", fontSize: "32px" }}>
        🚗 CarScout
      </h1>

      <p style={{ textAlign: "center", color: "#94a3b8" }}>
        Find the best car deals across the UK
      </p>

      {/* SEARCH BOX */}
      <div style={{
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "400px",
        margin: "20px auto"
      }}>
        <input
          placeholder="Make (BMW, Audi...)"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          style={{ width: "100%", marginTop: "10px", padding: "10px" }}
        />

        <input
          placeholder="Max Price (£)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", marginTop: "10px", padding: "10px" }}
        />

        <input
          placeholder="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          style={{ width: "100%", marginTop: "10px", padding: "10px" }}
        />

        <button onClick={openAll} style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#22c55e",
          border: "none",
          borderRadius: "6px"
        }}>
          🚀 Search Best Deals
        </button>

        <button onClick={saveAlert} style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#3b82f6",
          border: "none",
          borderRadius: "6px"
        }}>
          🔔 Save Alert
        </button>

        {dealRating && (
          <div style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#334155",
            borderRadius: "6px"
          }}>
            {dealRating}
          </div>
        )}
      </div>

      {/* ALERTS */}
      <h2 style={{ textAlign: "center" }}>🔔 Saved Alerts</h2>

      <div style={{ maxWidth: "400px", margin: "auto" }}>
        {alerts.length === 0 && <p>No alerts yet</p>}

        {alerts.map((alert, index) => (
          <div key={index} style={{
            backgroundColor: "#1e293b",
            padding: "10px",
            borderRadius: "8px",
            marginTop: "10px",
            position: "relative"
          }}>
            <p>{alert.make || "Any make"} - £{alert.price}</p>
            <p>{alert.postcode || "Any location"}</p>

            <button onClick={() => deleteAlert(index)} style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              backgroundColor: "red",
              border: "none",
              color: "white",
              padding: "5px",
              borderRadius: "4px"
            }}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}