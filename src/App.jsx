import { useState } from "react";
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {useRoutes} from 'react-router-dom'
import routes from "./routes";
function App() {
  let router=useRoutes(routes)
  return(
   <>
  <Sidebar></Sidebar>
  <Navbar></Navbar>
    <div className="w-4/5 float-left mt-[60px] p-6">
       {router}
    </div>
  </>)
}

export default App;
