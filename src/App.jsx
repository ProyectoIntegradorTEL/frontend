import { Routes, Route } from "react-router-dom";
import { DashboardLayout, AuthLayout, HomepageLayout } from "./layouts";


function App() {

  return (
    <Routes>
      <Route path="/dashboard/*" element={<DashboardLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/*" element={<HomepageLayout />} />
    </Routes>
  )
}

export default App
