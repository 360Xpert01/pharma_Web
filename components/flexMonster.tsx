import React from "react";
import * as WebDataRocksReact from "@webdatarocks/react-webdatarocks";
import "../app/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const reportJson = {
    dataSource: {
      data: [
        {
          Category: { type: "string" },
          Size: { type: "string" },
          Color: { type: "string" },
          Destination: { type: "string" },
          "Business Type": { type: "string" },
          Country: { type: "string" },
          Price: { type: "number" },
          Quantity: { type: "number" },
          Discount: { type: "number" },
        },
        {
          Category: "Accessories",
          Size: "262 oz",
          Color: "red",
          Destination: "Australia",
          "Business Type": "Specialty Bike Shop",
          Country: "Australia",
          Price: 174,
          Quantity: 225,
          Discount: 23,
        },
        {
          Category: "Accessories",
          Size: "214 oz",
          Color: "yellow",
          Destination: "Canada",
          "Business Type": "Specialty Bike Shop",
          Country: "Canada",
          Price: 502,
          Quantity: 90,
          Discount: 17,
        },
      ],
    },
  };

  return (
    <div>
      <WebDataRocksReact.Pivot toolbar={true} report={reportJson} />
    </div>
  );
}

export default App;
