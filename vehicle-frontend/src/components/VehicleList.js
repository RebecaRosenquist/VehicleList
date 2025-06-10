import React from "react";

const VehicleList = () => {
  const vehicles = [
    {
      vin: "1HGBH41JXMN109186",
      brand: "Volvo",
      modelName: "XC90",
      licensePlateNumber: "ABC123",
    },
    {
      vin: "2FMDK3JC6BBA12345",
      brand: "Tesla",
      modelName: "Model 3",
      licensePlateNumber: "TESLA3",
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">Fordonslista</h2>
      <ul className="list-group">
        {vehicles.map((vehicle) => (
          <li key={vehicle.vin} className="list-group-item">
            {vehicle.brand} {vehicle.modelName} – {vehicle.licensePlateNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;

