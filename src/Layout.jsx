import LinkedInNavbar from "./assets/components/LinkedInNavbar"
import LinkedInFooter from "./assets/components/LinkedInFooter"
import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"

export default function Layout({ token, onSelectProfile }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <LinkedInNavbar token={token} onSelectProfile={onSelectProfile} />
      <Container className="flex-grow-1 mt-4">
        <Outlet />
      </Container>
      <LinkedInFooter />
    </div>
  )
}
