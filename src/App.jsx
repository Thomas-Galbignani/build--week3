import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./Layout.jsx"
import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"

function App() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI2ZWYyODU2MzA1YzAwMTU1ODgzNTUiLCJpYXQiOjE3NTY4MTkyNDAsImV4cCI6MTc1ODAyODg0MH0.mJDQJKbzQs0cNjxS0dB4A7-DFPVUYsM0hZGX7abJwLY"
  const [selectedProfile, setSelectedProfile] = useState(null)
  // Uso questo stato per memorizzare il profilo scelto
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              token={token}
              onSelectProfile={(p) => setSelectedProfile(p)}
            />
          }
        >
          <Route index element={<Home token={token} />} />
          <Route
            path="profile"
            element={
              <Profile token={token} selectedProfile={selectedProfile} />
            }
          />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
