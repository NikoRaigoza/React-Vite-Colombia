import { useState, useEffect } from "react";
import DepartmentModal from "./DepartmentModal";

function DepartmentSelector() {
  
  const [departments, setDepartments] = useState([]);
  const [selected, setSelected] = useState("");
  const [showModal, setShowModal] = useState(false);

  
  //obtener departamentos
  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/Department')
      .then(response => response.json())
      .then(data => setDepartments(data));
  }, []);

    return (
  <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
    <label
      htmlFor="department"
      className="block mb-2 font-semibold text-gray-700"
    >
      Departamento:
    </label>

    <select
      id="department"
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      <option value="">-- Selecciona un departamento --</option>
      {departments.map((dep) => (
        <option key={dep.id} value={dep.id}>
          {dep.name}
        </option>
      ))}
    </select>

    {selected && (
      <p className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-800 text-blue-800 rounded">
        ID seleccionado: {selected}
      </p>
    )}
  </div>
);
}

export default DepartmentSelector;