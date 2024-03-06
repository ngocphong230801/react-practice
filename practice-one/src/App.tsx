// css
import './App.css'

// react-route-dom
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routers } from "./routers";

// pages
import DashboadPage from './pages/dashboad'
import StudentPage from './pages/students';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<DashboadPage />} />
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
