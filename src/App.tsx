import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import MainContent from "./components/MainContent"
import React, { Suspense } from "react"
import { NavBar } from "./components/NavBar"
import CartPage from "./page/CartPage"
const ProductPage = React.lazy(() => import("./components/ProductPage"))


function App() {

  return (
    <Router>
      <NavBar/>
      
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
              <Route 
                path="/cart"
                element={
                  <CartPage/>
                }
              />
          </Routes> 
    </Router>
  )
}

export default App
