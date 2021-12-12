import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Temp from './Temp';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

function App() {
  const [name, setName] = useState("Mehul");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:3001/order/?token=u5Qacpn2v5tRCVU86WZRKUSqkjbWmBgqJtYFniyH9_c.E4fDcXUIo4z68vhg04GRlghWKjeXy-KSaiiqfnq8T2k&scope&client_id=phpadmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 10, currency: "INR" }),
    }).then((t) => t.json());

    console.log(data.id);

    const options = {
      key: __DEV__ ? "rzp_test_xBnGkcMOBPKkTu" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Payment",
      description: "you hoarding payment",
      image:
        "https://staticfileadm.s3.ap-south-1.amazonaws.com/pictures/61829c046720dd0001883cfe.jpg",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "vishal singh",
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "+911234567890",
        "card[name]": "Gaurav Kumar",
        "card[number]": "4111111111111111",
        "card[expiry]": "12/21",
        "card[cvv]": "123",
      },
      theme: {
        color: "#bd0061",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate $5
        </a>
      </header>
      <Temp />
    </div>
  );
}

export default App;
