import { useState, useEffect } from "react";
import DepartmentModal from "./DepartmentModal";

interface Department {
  id: number;
  name: string;
  description: string;
}

function DepartmentSelector() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://api-colombia.com/api/v1/Department")
      .then((response) => response.json())
      .then((data: Department[]) => {
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setDepartments(sorted);
      });
  }, []);

  const department = departments.find((dep) => dep.id === Number(selected));

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-8 rounded-2xl bg-white border border-slate-200 shadow-xl">
      <label
        htmlFor="department"
        className="block mb-3 text-sm font-semibold uppercase tracking-wider text-blue-800"
      >
        Departamento
      </label>

      <div className="relative">
        <select
          id="department"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:border-slate-400"
        >
          <option value="">Selecciona un departamento</option>
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
          ▾
        </span>
      </div>

      {department && (
        <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 border-l-4 border-l-yellow-400">
          <h2 className="text-xl font-bold text-slate-900">{department.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
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