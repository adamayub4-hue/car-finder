"use client";
import { useState } from "react";

export default function Home() {
  const [make, setMake] = useState("");
  const [price, setPrice] = useState("");
  const [postcode, setPostcode] = useState("");

  // STRONG LINKS (work properly)
  const strongLinks = {
    autotrader: `https://www.autotrader.co.uk/car-search?make=${make}&price-to=${price}&postcode=${postcode}`,
    ebay: `https://www.ebay.co.uk/sch/i.html?_nkw=${make}&_udhi=${price}`,
    motors: `https://www.motors.co.uk/car-search/${make}/?price_to=${price}`,
    cargurus: `https://www.cargurus.co.uk/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?entitySelectingHelper.selectedMake=${make}&maxPrice=${price}`
  };

  // WEAKER LINKS (manual filtering needed)
  const weakLinks = {
    facebook: `https://www.facebook.com/marketplace/search/?query=${make}`,
    gumtree: `https://www.gumtree.com/search?search_category=cars&q=${make}`,
    copart: `https://www.copart.co.uk/vehicleFinder?query=${make}`
  };

  const openAll = () => {
    Object.values(strongLinks).forEach((link) => {
      window.open(link, "_blank");
    });
  };

  const quickBMW = () => {
    setMake("BMW");
    setPrice("5000");
  };

  const quickCheap = () => {
    setMake("");
    setPrice("2000");
  };

  const quickAudi = () => {
    setMake("Audi");
    setPrice("6000");
  };

  return (
    <div style={{
      backgroundColor: "#0f172a",
      color: "white",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{ textAlign: "center" }}>🚗 UK Car Finder</h1>

      {/* SEARCH BOX */}
      <div style={{
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "400px",
        margin: "20px auto"
      }}>
        <button onClick={quickBMW}>🔥 BMW Deals</button>
        <button onClick={quickCheap} style={{ marginLeft: "10px" }}>
          💸 Under £2000
        </button>
        <button onClick={quickAudi} style={{ marginLeft: "10px" }}>
          🚗 Audi Deals
        </button>

        <input
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          style={{ width: "100%", marginTop: "10px", padding: "10px" }}
        />

        <input
          placeholder="Max Price"
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

        <button 
          onClick={openAll}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            backgroundColor: "#22c55e",
            border: "none",
            borderRadius: "6px"
          }}
        >
          🚀 Search Best Sites
        </button>
      </div>

      {/* STRONG LINKS */}
      <h3 style={{ textAlign: "center" }}>⚡ Best Results</h3>
      <div style={{ textAlign: "center" }}>
        <a href={strongLinks.autotrader} target="_blank">AutoTrader</a> |{" "}
        <a href={strongLinks.ebay} target="_blank">eBay</a> |{" "}
        <a href={strongLinks.motors} target="_blank">Motors</a> |{" "}
        <a href={strongLinks.cargurus} target="_blank">CarGurus</a>
      </div>

      {/* WEAKER LINKS */}
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>
        ⚠️ Other Sites (may need filtering)
      </h3>
      <div style={{ textAlign: "center" }}>
        <a href={weakLinks.facebook} target="_blank">Facebook</a> |{" "}
        <a href={weakLinks.gumtree} target="_blank">Gumtree</a> |{" "}
        <a href={weakLinks.copart} target="_blank">Copart</a>
      </div>

      {/* DEAL CARDS */}
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>
        🔥 Featured Deals
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "15px",
        marginTop: "20px"
      }}>
        <div style={{
          backgroundColor: "#1e293b",
          padding: "15px",
          borderRadius: "10px"
        }}>
          <h3>BMW 3 Series</h3>
          <p>£2,300</p>
          <p>🔥 Good deal</p>
          <a href={strongLinks.autotrader} target="_blank" style={{ color: "#22c55e" }}>
            View →
          </a>
        </div>

        <div style={{
          backgroundColor: "#1e293b",
          padding: "15px",
          borderRadius: "10px"
        }}>
          <h3>Ford Fiesta</h3>
          <p>£1,800</p>
          <p>💸 Cheap</p>
          <a href={strongLinks.ebay} target="_blank" style={{ color: "#22c55e" }}>
            View →
          </a>
        </div>

        <div style={{
          backgroundColor: "#1e293b",
          padding: "15px",
          borderRadius: "10px"
        }}>
          <h3>Audi A3</h3>
          <p>£2,900</p>
          <p>👍 Value</p>
          <a href={weakLinks.facebook} target="_blank" style={{ color: "#22c55e" }}>
            View →
          </a>
        </div>
      </div>
    </div>
  );
}