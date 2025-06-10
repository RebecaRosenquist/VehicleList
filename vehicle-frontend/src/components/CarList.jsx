import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCarId, setEditCarId] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Manuell lista för brands
  const brands = [
    { id: 1, name: "Volvo" },
    { id: 2, name: "BMW" },
    { id: 3, name: "Audi" },
    { id: 4, name: "Tesla" },
    { id: 5, name: "Mercedes" },
    { id: 6, name: "Toyota" },
    { id: 7, name: "Honda" },
    { id: 8, name: "Ford" },
    { id: 9, name: "Nissan" },
    { id: 10, name: "Mazda" },
  ];

  // Manuell lista för colours
  const colours = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Silver",
    "Green",
    "Yellow",
    "Orange",
    "Purple",
    "Brown",
  ];

  // Manuell lista för equipments med id och namn
  const manualEquipments = [
    { id: 1, name: "Air Conditioning" },
    { id: 2, name: "Leather Seats" },
    { id: 3, name: "Sunroof" },
    { id: 4, name: "Bluetooth" },
    { id: 5, name: "Backup Camera" },
    { id: 6, name: "Cruise Control" },
    { id: 7, name: "Heated Seats" },
    { id: 8, name: "Navigation System" },
    { id: 9, name: "Keyless Entry" },
    { id: 10, name: "Parking Sensors" },
  ];

  // Shared state for new or editing car
  const [newCar, setNewCar] = useState({
    vin: "",
    licensePlateNumber: "",
    modelName: "",
    colour: "",
    brandId: 1,
    carEquipmentIds: [],
  });

  // Fetch cars
  const fetchCars = async () => {
    try {
      const res = await fetch("http://localhost:5246/api/car");
      const data = await res.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this vehicle?"))
//       return;

//     try {
//       await fetch(`http://localhost:5246/api/car/${id}`, {
//         method: "DELETE",
//       });
//       setCars((prev) => prev.filter((car) => car.id !== id));
//       setConfirmationMessage("Vehicle deleted");
//       setTimeout(() => setConfirmationMessage(""), 3000);
//     } catch (error) {
//       console.error("Error deleting vehicle:", error);
//     }
//   };

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this vehicle?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await fetch(`http://localhost:5246/api/car/${id}`, { method: "DELETE" });
    setCars((prev) => prev.filter((car) => car.id !== id));
    setConfirmationMessage("Vehicle deleted");
    setTimeout(() => setConfirmationMessage(""), 3000);
  } catch (error) {
    console.error("Error deleting vehicle:", error);
  }
};

  // Start editing: populate form with car data
  const handleEdit = (car) => {
    setEditCarId(car.id);
    setNewCar({
      vin: car.vin,
      licensePlateNumber: car.licensePlateNumber,
      modelName: car.modelName,
      colour: car.colour,
      brandId: car.brandId,
      carEquipmentIds: car.carEquipments.map((e) => e.id),
    });
    setShowForm(true);
  };

  // Cancel editing/new
  const cancelForm = () => {
    setShowForm(false);
    setEditCarId(null);
    setNewCar({
      vin: "",
      licensePlateNumber: "",
      modelName: "",
      colour: "",
      brandId: "",
      carEquipmentIds: [],
    });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    // Validation
    if (!/^\d{9}$/.test(newCar.vin)) {
      alert("VIN must be exactly 9 digits");
      return;
    }

    if (!/^[a-zA-Z0-9]{6}$/.test(newCar.licensePlateNumber)) {
      alert(
        "License Plate must be exactly 6 characters (letters and/or numbers)"
      );
      return;
    }

    if (!newCar.brandId) {
      alert("Brand must be selected");
      return;
    }

    if (!newCar.colour) {
      alert("Colour must be selected");
      return;
    }

    const method = editCarId ? "PUT" : "POST";
    const url = editCarId
      ? `http://localhost:5246/api/car/${editCarId}`
      : "http://localhost:5246/api/car";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });
      if (res.ok) {
        await fetchCars();
        cancelForm();
        setConfirmationMessage(
          editCarId
            ? "Vehicle updated"
            : "Vehicle added"
        );
        setTimeout(() => setConfirmationMessage(""), 3000);
      } else {
        alert("Error saving vehicle");
      }
    } catch (err) {
      console.error("Error saving vehicle:", err);
    }
  };

  if (loading) return <div>Loading cars...</div>;

  return (
    <div className="container mt-4" style={{ position: "relative" }}>
      {/* Confirmation message - absolutely positioned */}
      {confirmationMessage && (
        <div
          className="alert alert-success position-absolute"
          style={{
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "fit-content",
            minWidth: "250px",
            textAlign: "center",
            fontSize: "0.9rem",
            padding: "4px 10px",
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {confirmationMessage}
        </div>
      )}

      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{ minHeight: "40px" }}
      >
        <h2>Vehicle List</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            cancelForm();
            setShowForm(true);
          }}
        >
          <span className="d-none d-sm-inline">+ New Vehicle</span>
          <span className="d-inline d-sm-none">+</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateOrUpdate}
          className="mb-4 border p-3 rounded"
        >
          <h5>{editCarId ? "Edit Car" : "Add New Car"}</h5>
          <div className="row mb-3">
            <div className="col-12 col-md-3 mb-2 mb-md-0">
              <label htmlFor="vin" className="fw-bold">
                VIN (9 chars)
              </label>
              <input
                id="vin"
                required
                className="form-control"
                placeholder="VIN"
                value={newCar.vin}
                onChange={(e) => setNewCar({ ...newCar, vin: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-3 mb-2 mb-md-0">
              <label htmlFor="licensePlateNumber" className="fw-bold">
                License Plate
              </label>
              <input
                id="licensePlateNumber"
                required
                className="form-control"
                placeholder="License Plate"
                value={newCar.licensePlateNumber}
                onChange={(e) =>
                  setNewCar({ ...newCar, licensePlateNumber: e.target.value })
                }
              />
            </div>
            <div className="col-12 col-md-3 mb-2 mb-md-0">
              <label htmlFor="modelName" className="fw-bold">
                Model Name
              </label>
              <input
                id="modelName"
                required
                className="form-control"
                placeholder="Model Name"
                value={newCar.modelName}
                onChange={(e) =>
                  setNewCar({ ...newCar, modelName: e.target.value })
                }
              />
            </div>

            <div className="col-12 col-md-3 mb-2 mb-md-0">
              <label htmlFor="brandId" className="fw-bold">
                Brand
              </label>
              <select
                id="brandId"
                required
                className="form-select"
                value={newCar.brandId}
                onChange={(e) =>
                  setNewCar({ ...newCar, brandId: Number(e.target.value) })
                }
              >
                <option value="" disabled hidden>
                  Select brand
                </option>

                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-3 mb-2">
              <label htmlFor="colour" className="fw-bold">
                Colour
              </label>
              <select
                id="colour"
                required
                className="form-select"
                value={newCar.colour}
                onChange={(e) =>
                  setNewCar({ ...newCar, colour: e.target.value })
                }
              >
                <option value="" disabled hidden>
                  Select colour
                </option>
                {colours.map((colour, i) => (
                  <option key={i} value={colour}>
                    {colour}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="fw-bold d-block mb-2">Equipments:</label>
            <div className="d-flex flex-wrap flex-column flex-md-row">
              {manualEquipments.map((equipment) => (
                <div
                  key={equipment.id}
                  className="form-check me-3 mb-2"
                  style={{ minWidth: "150px" }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`equipment-${equipment.id}`}
                    checked={newCar.carEquipmentIds.includes(equipment.id)}
                    onChange={() => {
                      const newIds = newCar.carEquipmentIds.includes(
                        equipment.id
                      )
                        ? newCar.carEquipmentIds.filter(
                            (id) => id !== equipment.id
                          )
                        : [...newCar.carEquipmentIds, equipment.id];
                      setNewCar({ ...newCar, carEquipmentIds: newIds });
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`equipment-${equipment.id}`}
                  >
                    {equipment.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-primary me-2" type="submit">
            Save
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={cancelForm}
          >
            Cancel
          </button>
        </form>
      )}

      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th></th>
            <th>VIN</th>
            <th>License</th>
            <th className="d-none d-md-table-cell">Brand</th>
            <th className="d-none d-md-table-cell">Model</th>
            <th className="d-none d-md-table-cell">Colour</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>
          {cars.map((car) => (
            <React.Fragment key={car.id}>
              <tr>
                <td>
                  <i
                    className={`bi ${
                      expandedRows.includes(car.id)
                        ? "bi-chevron-up"
                        : "bi-chevron-down"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleRow(car.id)}
                  ></i>
                </td>
                <td>{car.vin}</td>
                <td>{car.licensePlateNumber}</td>
                <td className="d-none d-md-table-cell">{car.brand?.name}</td>
                <td className="d-none d-md-table-cell">{car.modelName}</td>
                <td className="d-none d-md-table-cell">{car.colour}</td>
                <td className="text-end">
                  <i
                    className="bi bi-pencil-square text-primary me-3"
                    role="button"
                    onClick={() => handleEdit(car)}
                  ></i>
                  <i
                    className="bi bi-trash text-danger"
                    role="button"
                    onClick={() => handleDelete(car.id)}
                  ></i>
                </td>
              </tr>

              {expandedRows.includes(car.id) && (
                <tr>
                  <td></td>
                  <td colSpan="6">
                    {/* Extra info för små skärmar */}
                    <div
                      className="d-md-none mb-2"
                      style={{ display: "block" }}
                    >
                      <ul
                        className="no-bullets"
                        style={{ marginBottom: 0, paddingLeft: 0 }}
                      >
                        <li style={{ paddingLeft: 0 }}>
                          <strong>Brand:</strong> {car.brand?.name}
                        </li>

                        <li>
                          {" "}
                          <strong>Model:</strong> {car.modelName}
                        </li>

                        <li>
                          <strong>Colour:</strong> {car.colour}
                        </li>
                      </ul>
                    </div>
                    {/* Equipments */}
                    <div
                      style={{ fontWeight: "bold", marginBottom: "4px" }}
                    ></div>
                    <li
                      className="no-bullets"
                      style={{ marginLeft: 0, marginTop: 0, paddingTop: 0 }}
                    >
                      <strong>Equipments:</strong>{" "}
                    </li>
                    {car.carEquipments.length > 0
                      ? car.carEquipments.map((eq) => eq.name).join("  -  ")
                      : "None"}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}







// import React, { useEffect, useState, useRef } from "react";

// export default function CarList() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editCarId, setEditCarId] = useState(null);
//   const [confirmationMessage, setConfirmationMessage] = useState("");

//   // Manuell lista för brands
//   const brands = [
//     { id: 1, name: "Volvo" },
//     { id: 2, name: "BMW" },
//     { id: 3, name: "Audi" },
//     { id: 4, name: "Tesla" },
//     { id: 5, name: "Mercedes" },
//     { id: 6, name: "Toyota" },
//     { id: 7, name: "Honda" },
//     { id: 8, name: "Ford" },
//     { id: 9, name: "Nissan" },
//     { id: 10, name: "Mazda" },
//   ];

//   // Manuell lista för colours
//   const colours = [
//     "Black",
//     "White",
//     "Red",
//     "Blue",
//     "Silver",
//     "Green",
//     "Yellow",
//     "Orange",
//     "Purple",
//     "Brown",
//   ];

//   // Manuell lista för equipments med id och namn
//   const manualEquipments = [
//     { id: 1, name: "Air Conditioning" },
//     { id: 2, name: "Leather Seats" },
//     { id: 3, name: "Sunroof" },
//     { id: 4, name: "Bluetooth" },
//     { id: 5, name: "Backup Camera" },
//     { id: 6, name: "Cruise Control" },
//     { id: 7, name: "Heated Seats" },
//     { id: 8, name: "Navigation System" },
//     { id: 9, name: "Keyless Entry" },
//     { id: 10, name: "Parking Sensors" },
//   ];

//   // Shared state for new or editing car
//   const [newCar, setNewCar] = useState({
//     vin: "",
//     licensePlateNumber: "",
//     modelName: "",
//     colour: "",
//     brandId: 1,
//     carEquipmentIds: [],
//   });

//   const containerRef = useRef(null);
//   const [visibleColumns, setVisibleColumns] = useState({
//     vin: true,
//     licensePlateNumber: true,
//     brand: true,
//     modelName: true,
//     colour: true,
//   });

//   // Fetch cars
//   const fetchCars = async () => {
//     try {
//       const res = await fetch("http://localhost:5246/api/car");
//       const data = await res.json();
//       setCars(data);
//     } catch (error) {
//       console.error("Error fetching cars:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   // Lyssna på fönsterstorlek och beräkna kolumner som får plats
//   useEffect(() => {
//     const handleResize = () => {
//       if (!containerRef.current) return;

//       // Enkel approximation på bredd som krävs per kolumn i px (kan justeras)
//       const requiredWidth = {
//         vin: 120,
//         licensePlateNumber: 120,
//         brand: 100,
//         modelName: 120,
//         colour: 80,
//       };

//       // Bredd på hela containern
//       const containerWidth = containerRef.current.offsetWidth;

//       // Börja med att visa alla kolumner
//       let total = 0;
//       const visible = {};
//       // Kolumner i den ordning de ska visas
//       const cols = ["vin", "licensePlateNumber", "brand", "modelName", "colour"];

//       for (const col of cols) {
//         total += requiredWidth[col];
//         if (total <= containerWidth - 100) {
//           // -100 som säkerhetsmarginal för knappar mm
//           visible[col] = true;
//         } else {
//           visible[col] = false;
//         }
//       }
//       setVisibleColumns(visible);
//     };

//     handleResize(); // Kör på mount
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleRow = (id) => {
//     setExpandedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this car?")) return;

//     try {
//       await fetch(`http://localhost:5246/api/car/${id}`, {
//         method: "DELETE",
//       });
//       setCars((prev) => prev.filter((car) => car.id !== id));
//       setConfirmationMessage("Car deleted successfully");
//       setTimeout(() => setConfirmationMessage(""), 3000);
//     } catch (error) {
//       console.error("Error deleting car:", error);
//     }
//   };

//   // Start editing: populate form with car data
//   const handleEdit = (car) => {
//     setEditCarId(car.id);
//     setNewCar({
//       vin: car.vin,
//       licensePlateNumber: car.licensePlateNumber,
//       modelName: car.modelName,
//       colour: car.colour,
//       brandId: car.brandId,
//       carEquipmentIds: car.carEquipments.map((e) => e.id),
//     });
//     setShowForm(true);
//   };

//   // Cancel editing/new
//   const cancelForm = () => {
//     setShowForm(false);
//     setEditCarId(null);
//     setNewCar({
//       vin: "",
//       licensePlateNumber: "",
//       modelName: "",
//       colour: "",
//       brandId: 1,
//       carEquipmentIds: [],
//     });
//   };

//   const handleCreateOrUpdate = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!/^\d{9}$/.test(newCar.vin)) {
//       alert("VIN must be exactly 9 digits");
//       return;
//     }

//     if (!/^[a-zA-Z0-9]{6}$/.test(newCar.licensePlateNumber)) {
//       alert(
//         "License Plate must be exactly 6 characters (letters and/or numbers)"
//       );
//       return;
//     }

//     if (!newCar.brandId) {
//       alert("Brand must be selected");
//       return;
//     }

//     if (!newCar.colour) {
//       alert("Colour must be selected");
//       return;
//     }

//     const method = editCarId ? "PUT" : "POST";
//     const url = editCarId
//       ? `http://localhost:5246/api/car/${editCarId}`
//       : "http://localhost:5246/api/car";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newCar),
//       });
//       if (res.ok) {
//         await fetchCars();
//         cancelForm();
//         setConfirmationMessage(
//           editCarId
//             ? "Vehicle updated successfully"
//             : "Vehicle added successfully"
//         );
//         setTimeout(() => setConfirmationMessage(""), 3000);
//       } else {
//         alert("Error saving vehicle");
//       }
//     } catch (err) {
//       console.error("Error saving vehicle:", err);
//     }
//   };

//   if (loading) return <div>Loading cars...</div>;

//   return (
//     <div className="container mt-4" style={{ position: "relative" }} ref={containerRef}>
//       {/* Confirmation message - absolutely positioned */}
//       {confirmationMessage && (
//         <div
//           className="alert alert-success position-absolute"
//           style={{
//             top: "10px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "fit-content",
//             minWidth: "250px",
//             textAlign: "center",
//             fontSize: "0.9rem",
//             padding: "4px 10px",
//             zIndex: 1000,
//             boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//           }}
//         >
//           {confirmationMessage}
//         </div>
//       )}

//       <div
//         className="d-flex justify-content-between align-items-center mb-3"
//         style={{ minHeight: "40px" }}
//       >
//         <h2>Vehicle List</h2>
//         <button
//           className="btn btn-success"
//           onClick={() => {
//             cancelForm();
//             setShowForm(true);
//           }}
//         >
//           <span className="d-none d-sm-inline">+ New Vehicle</span>
//           <span className="d-inline d-sm-none">+</span>
//         </button>
//       </div>

//       {showForm && (
//         <form
//           onSubmit={handleCreateOrUpdate}
//           className="mb-4 border p-3 rounded"
//         >
//           {/* Form code unchanged */}
//           ...
//         </form>
//       )}

//       <table className="table table-striped">
//         <thead>
//           <tr>
//             {visibleColumns.vin && <th>VIN</th>}
//             {visibleColumns.licensePlateNumber && <th>License</th>}
//             {visibleColumns.brand && <th>Brand</th>}
//             {visibleColumns.modelName && <th>Model</th>}
//             {visibleColumns.colour && <th>Colour</th>}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cars.map((car) => {
//             const isExpanded = expandedRows.includes(car.id);

//             // Uppdelning: kolumner som syns och som går ner i "equipment"-delen
//             const hiddenCols = Object.entries(visibleColumns)
//               .filter(([key, visible]) => !visible)
//               .map(([key]) => key);

//             return (
//               <React.Fragment key={car.id}>
//                 <tr>
//                   {visibleColumns.vin && <td>{car.vin}</td>}
//                   {visibleColumns.licensePlateNumber && (
//                     <td>{car.licensePlateNumber}</td>
//                   )}
//                   {visibleColumns.brand && (
//                     <td>{brands.find((b) => b.id === car.brandId)?.name}</td>
//                   )}
//                   {visibleColumns.modelName && <td>{car.modelName}</td>}
//                   {visibleColumns.colour && <td>{car.colour}</td>}
//                   <td>
//                     <button
//                       className="btn btn-sm btn-primary me-2"
//                       onClick={() => handleEdit(car)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-sm btn-danger me-2"
//                       onClick={() => handleDelete(car.id)}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       className="btn btn-sm btn-secondary"
//                       onClick={() => toggleRow(car.id)}
//                     >
//                       {isExpanded ? "Collapse" : "Expand"}
//                     </button>
//                   </td>
//                 </tr>
//                 {isExpanded && (
//                   <tr>
//                     <td colSpan={visibleColumns.vin +
//                       visibleColumns.licensePlateNumber +
//                       visibleColumns.brand +
//                       visibleColumns.modelName +
//                       visibleColumns.colour +
//                       1}
//                     >
//                       <div>
//                         {/* Equipments */}
//                         <strong>Equipments:</strong>{" "}
//                         {car.carEquipments
//                           .map(
//                             (e) =>
//                               manualEquipments.find((me) => me.id === e.id)
//                                 ?.name
//                           )
//                           .join(", ") || "None"}

//                         {/* Här visas kolumner som inte får plats och flyttas ner */}
//                         {hiddenCols.length > 0 && (
//                           <div className="mt-2">
//                             {hiddenCols.includes("vin") && (
//                               <div>
//                                 <strong>VIN:</strong> {car.vin}
//                               </div>
//                             )}
//                             {hiddenCols.includes("licensePlateNumber") && (
//                               <div>
//                                 <strong>License:</strong>{" "}
//                                 {car.licensePlateNumber}
//                               </div>
//                             )}
//                             {hiddenCols.includes("brand") && (
//                               <div>
//                                 <strong>Brand:</strong>{" "}
//                                 {brands.find((b) => b.id === car.brandId)?.name}
//                               </div>
//                             )}
//                             {hiddenCols.includes("modelName") && (
//                               <div>
//                                 <strong>Model:</strong> {car.modelName}
//                               </div>
//                             )}
//                             {hiddenCols.includes("colour") && (
//                               <div>
//                                 <strong>Colour:</strong> {car.colour}
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }
