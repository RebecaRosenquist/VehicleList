// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// const NewCarModal = ({ show, handleClose, onCarAdded }) => {
//   const [vin, setVin] = useState("");
//   const [licensePlate, setLicensePlate] = useState("");
//   const [modelName, setModelName] = useState("");
//   const [colour, setColour] = useState("");
//   const [brandId, setBrandId] = useState("");
//   const [equipments, setEquipments] = useState([]);
//   const [allBrands, setAllBrands] = useState([]);
//   const [allEquipments, setAllEquipments] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5246/api/brand")
//       .then((res) => res.json())
//       .then((data) => setAllBrands(data));

//     fetch("http://localhost:5246/api/carequipment")
//       .then((res) => res.json())
//       .then((data) => setAllEquipments(data));
//   }, []);

//   const toggleEquipment = (id) => {
//     setEquipments((prev) =>
//       prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newCar = {
//       vin,
//       licensePlateNumber: licensePlate,
//       modelName,
//       colour,
//       brandId: parseInt(brandId),
//       carEquipmentIds: equipments,
//     };

//     fetch("http://localhost:5246/api/car", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newCar),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         onCarAdded();
//         handleClose();
//         // Reset form
//         setVin("");
//         setLicensePlate("");
//         setModelName("");
//         setColour("");
//         setBrandId("");
//         setEquipments([]);
//       });
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Form onSubmit={handleSubmit}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Car</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-2">
//             <Form.Label>VIN</Form.Label>
//             <Form.Control
//               value={vin}
//               onChange={(e) => setVin(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-2">
//             <Form.Label>License Plate</Form.Label>
//             <Form.Control
//               value={licensePlate}
//               onChange={(e) => setLicensePlate(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-2">
//             <Form.Label>Model Name</Form.Label>
//             <Form.Control
//               value={modelName}
//               onChange={(e) => setModelName(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-2">
//             <Form.Label>Colour</Form.Label>
//             <Form.Control
//               value={colour}
//               onChange={(e) => setColour(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-2">
//             <Form.Label>Brand</Form.Label>
//             <Form.Select
//               value={brandId}
//               onChange={(e) => setBrandId(e.target.value)}
//               required
//             >
//               <option value="">Select brand</option>
//               {allBrands.map((b) => (
//                 <option key={b.id} value={b.id}>
//                   {b.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//           <Form.Group className="mb-2">
//             <Form.Label>Equipments</Form.Label>
//             {allEquipments.map((eq) => (
//               <Form.Check
//                 key={eq.id}
//                 type="checkbox"
//                 label={eq.name}
//                 checked={equipments.includes(eq.id)}
//                 onChange={() => toggleEquipment(eq.id)}
//               />
//             ))}
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button type="submit" variant="primary">
//             Add Car
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// };

// export default NewCarModal;
