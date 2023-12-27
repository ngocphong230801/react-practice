import './App.css'
import DashboadPage from './pages/dashboad'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { routers } from "./routers";
import StudentPage from './pages/student';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element = {<DashboadPage />} />
      <Route element = {<StudentPage />}>
        {routers.map((item) => (
          <Route key={item.path} path= {item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
