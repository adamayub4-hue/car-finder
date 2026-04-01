"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [make, setMake] = useState("");
  const [price, setPrice] = useState("");
  const [postcode, setPostcode] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [results, setResults] = useState([]);

  // Load saved alerts
  useEffect(() => {
    const savedAlerts = localStorage.getItem("alerts");
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  // Save alerts
  useEffect(() => {
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  // Save alert function
  const saveAlert = () => {
    const newAlert = { make, price, postcode };
    setAlerts([...alerts, newAlert]);
  };

  // Search deals (fake for now)
  const searchDeals = () => {
    const fakeResults = [
      {
        title: "BMW 3 Series",
        price: "£5200",
        location: "London",
        link: "https://www.autotrader.co.uk",
      },
      {
        title: "Audi A4",
        price: "£4800",
        location: "Manchester",
        link: "https://www.motors.co.uk",
      },
    ];

    setResults(fakeResults);
  };

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h1>🚗 CarScout</h1>
        <p>Find the best car deals across the UK</p>

        <input
          placeholder="Make (BMW, Audi...)"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <input
          placeholder="Max Price (£)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <input
          placeholder="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <button
          onClick={searchDeals}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#22c55e",
            border: "none",
            borderRadius: "6px",
            marginTop: "10px",
          }}
        >
          🔎 Search Best Deals
        </button>

        <button
          onClick={saveAlert}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#3b82f6",
            border: "none",
            borderRadius: "6px",
            marginTop: "10px",
          }}
        >
          🔔 Save Alert
        </button>

        {/* RESULTS */}
        <div style={{ marginTop: "20px" }}>
          {results.map((car, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#334155",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "6px",
              }}
            >
              <h3>{car.title}</h3>
              <p>
                {car.price} - {car.location}
              </p>
              <a href={car.link} target="_blank">
                View Deal
              </a>
            </div>
          ))}
        </div>

        {/* ALERTS */}
        <div style={{ marginTop: "20px" }}>
          <h3>🔔 Saved Alerts</h3>
          {alerts.length === 0 ? (
            <p>No alerts yet</p>
          ) : (
            alerts.map((alert, index) => (
              <div key={index}>
                {alert.make} - £{alert.price} - {alert.postcode}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}