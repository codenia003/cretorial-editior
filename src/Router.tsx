import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import { useContext } from "react"
import React from "react"

const Router = () => {


  return (
    // <BrowserRouter basename={'/editor'}>
    <BrowserRouter>
      <Routes>
        <Route path="/manage" element={<Dashboard />} />
        <Route path="/" element={<DesignEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router


