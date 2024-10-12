import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import MainContent from "./components/MainContent"
import React, { Suspense } from "react"
const ProductPage = React.lazy(() => import("./components/ProductPage"))

function App() {

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar/>

        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent/>}/>
              <Route 
                path="/product/:id" 
                element={
                  <Suspense fallback={<div>Loading Product...</div>}>
                    <ProductPage/>
                  </Suspense>
                }
              />
          </Routes> 
        </div>

      </div>
    </Router>
  )
}

export default App
