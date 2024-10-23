import { Routes, Route } from "react-router-dom";
import { DashboardLayout, AuthLayout, HomepageLayout, StepsLayout } from "./layouts";
import { SignIn } from "./pages/auth";
import { SignUp } from "./pages/auth";
import { MotorTestLayout } from "./layouts";

function App() {

  return (
    <Routes>
      <Route path="/dashboard/*" element={<DashboardLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/*" element={<HomepageLayout />} />
      <Route path="motor-test/*" element={<MotorTestLayout/>} />

      <Route path="/step/*" element={<StepsLayout />} />
      <Route path="/sign-in" element={<SignIn/>}></Route>
      <Route path="/sign-up" element={<SignUp/>}></Route>
      
    </Routes>
  )
}

export default App