import React, { useEffect, useState } from "react";
import axios from "axios";

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios
      .get("/api/vehicle")
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="text-primary">Fordonslista</h1>
      <ul className="list-group">
        <li className="list-group-item">Volvo XC90</li>
        <li className="list-group-item">Tesla Model 3</li>
      </ul>
    </div>
  );
}

export default VehicleList;

