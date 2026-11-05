import { useState, useEffect } from "react";
import DepartmentModal from "./DepartmentModal";

// Forma de cada departamento que devuelve la API
interface Department {
  id: number;
  name: string;
  description: string;
}

function DepartmentSelector() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  // Obtener departamentos al cargar
  useEffect(() => {
    fetch("https://api-colombia.com/api/v1/Department")
      .then((response) => response.json())
      .then((data: Department[]) => {
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setDepartments(sorted);
      });
  }, []);

  // Buscar el departamento completo a partir del id seleccionado
  const department = departments.find((dep) => dep.id === Number(selected));

  return (
    <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
      <label
        htmlFor="department"
        className="block mb-3 text-sm font-medium uppercase tracking-wider text-slate-300"
      >
        Departamento
      </label>

      <div className="relative">
        <select
          id="department"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-slate-900/60 border border-white/10 text-white cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:border-white/30"
        >
          <option value="">Selecciona un departamento</option>
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>

        {/* Flecha personalizada */}
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          ▾
        </span>
      </div>

      {department && (
        <div className="mt-6 p-5 rounded-xl bg-slate-900/50 border-l-4 border-yellow-400">
          <h2 className="text-xl font-bold text-white">{department.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300 line-clamp-3">
            {department.description}
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 w-full py-2.5 rounded-lg bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-300 transition"
          >
            Ver detalle completo
          </button>
        </div>
      )}

      {showModal && department && (
        <DepartmentModal
          departmentId={department.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default DepartmentSelector;