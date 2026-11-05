import DepartmentSelector from "./components/DepartmentSelector";

export function App() {
  return (
    <div className=" min-h-screen bg-gray-100 pt-10">
      <h1 className="text-3xl font-bold text-center text-blue-800">
        Explora Colombia
      </h1>
      <DepartmentSelector />
  </div>
  );
}

export default App;
