import { Routes, Route } from "react-router-dom";
import { DashboardLayout, AuthLayout, HomepageLayout, MotorTestLayout } from "./layouts";


function App() {

  return (
    <Routes>
      <Route path="/dashboard/*" element={<DashboardLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/*" element={<HomepageLayout />} />
      <Route path="motor-test/*" element={<MotorTestLayout/>} />

    </Routes>
  )
}

export default App
