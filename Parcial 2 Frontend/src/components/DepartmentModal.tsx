import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// Detalle de un departamento (/Department/{id})
interface DepartmentDetail {
  id: number;
  name: string;
  description: string;
  population: number | null;
  surface: number | null;
  municipalities: number | null;
  phonePrefix: string | null;
  cityCapital: {
    id: number;
    name: string;
  } | null;
}

// Cada ciudad (/Department/{id}/cities)
interface City {
  id: number;
  name: string;
  population: number | null;
}

interface DepartmentModalProps {
  departmentId: number;
  onClose: () => void;
}

function DepartmentModal({ departmentId, onClose }: DepartmentModalProps) {
  const [department, setDepartment] = useState<DepartmentDetail | null>(null);
  const [cities, setCities] = useState<City[]>([]);

  // Pedir el detalle y las ciudades al mismo tiempo
  useEffect(() => {
    const base = "https://api-colombia.com/api/v1/Department";

    Promise.all([
      fetch(`${base}/${departmentId}`).then((r) => r.json() as Promise<DepartmentDetail>),
      fetch(`${base}/${departmentId}/cities`).then((r) => r.json() as Promise<City[]>),
    ]).then(([dep, cityList]) => {
      setDepartment(dep);
      setCities(cityList.sort((a, b) => a.name.localeCompare(b.name)));
    });
  }, [departmentId]);

  // Formatear números al estilo colombiano: 6.677.930
  const format = (n: number | null): string =>
    n ? n.toLocaleString("es-CO") : "N/D";

  // Datos clave para la cuadrícula
  const stats = department
    ? [
        { label: "Capital", value: department.cityCapital?.name ?? "N/D" },
        { label: "Población", value: format(department.population) },
        { label: "Superficie", value: `${format(department.surface)} km²` },
        { label: "Municipios", value: format(department.municipalities) },
        { label: "Indicativo", value: department.phonePrefix ?? "N/D" },
        { label: "Ciudades", value: String(cities.length) },
      ]
    : [];

  // Renderizar el modal directamente en <body>
  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl"
      >
        {!department ? (
          <p className="text-center text-slate-400">Cargando detalle...</p>
        ) : (
          <>
            {/* Encabezado */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-3xl font-bold text-white">{department.name}</h2>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="text-2xl text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {department.description}
            </p>

            {/* Datos clave */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-yellow-300">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Lista de ciudades */}
            <h3 className="mt-8 mb-3 text-lg font-semibold text-white">Ciudades</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cities.map((city) => (
                <li
                  key={city.id}
                  className="flex justify-between px-4 py-2 rounded-lg bg-white/5 text-sm"
                >
                  <span className="text-slate-200">{city.name}</span>
                  <span className="text-slate-500">{format(city.population)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

export default DepartmentModal;