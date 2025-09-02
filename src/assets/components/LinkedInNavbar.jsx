import { useState } from "react";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import {
  BsLinkedin,
  BsHouseDoorFill,
  BsPeopleFill,
  BsBriefcaseFill,
  BsChatDotsFill,
  BsBellFill,
  BsGrid3X3GapFill,
  BsSearch,
} from "react-icons/bs";

/* Search base */
const SearchBox = () => (
  <div className="lkd-search-pill">
    <span className="lkd-search-icon">
      <BsSearch />
    </span>
    <input type="search" placeholder="Cerca" className="lkd-search-input" />
  </div>
);

const LinkedInNavbar = () => {
  const [active, setActive] = useState("home");

  const IconItem = ({ icon, label, eventKey }) => (
    <Nav.Link
      eventKey={eventKey}
      className={`lkd-item px-3 ${active === eventKey ? "active" : ""}`}
      onClick={() => setActive(eventKey)}
    >
      <div className="d-flex flex-column align-items-center gap-1">
        <span className="lkd-icon fs-5">{icon}</span>
        <small className="nav-label">{label}</small>
      </div>
    </Nav.Link>
  );

  return (
    <Navbar
      expand="lg"
      className="shadow-sm linkedin-navbar w-100"
      bg="white"
      variant="light"
      sticky="top"
    >
      <Container fluid>
        {/* Sinistra */}
        <div className="d-flex align-items-center gap-3">
          <a href="#" className="d-flex align-items-center text-primary fs-2">
            <BsLinkedin />
          </a>
          <div className="d-none d-md-block" style={{ minWidth: 360 }}>
            <SearchBox />
          </div>
        </div>

        <Navbar.Toggle aria-controls="lkd-nav" />

        {/* Destra */}
        <Navbar.Collapse id="lkd-nav">
          <Nav
            className="ms-auto align-items-center"
            activeKey={active}
            onSelect={(k) => setActive(k)}
          >
            <IconItem icon={<BsHouseDoorFill />} label="Home" eventKey="home" />
            <IconItem icon={<BsPeopleFill />} label="Rete" eventKey="rete" />
            <IconItem
              icon={<BsBriefcaseFill />}
              label="Lavoro"
              eventKey="lavoro"
            />
            <IconItem
              icon={<BsChatDotsFill />}
              label="Messaggistica"
              eventKey="msg"
            />
            <IconItem
              icon={<BsBellFill />}
              label="Notifiche"
              eventKey="notifiche"
            />

            {/* Profilo */}
            <Nav.Item className="px-3 nav-divider-lg">
              <Dropdown align="end" popperConfig={{ strategy: "fixed" }}>
                <Dropdown.Toggle
                  variant="link"
                  className="text-decoration-none text-secondary p-0"
                >
                  <div className="d-flex flex-column align-items-center gap-1">
                    <Image
                      roundedCircle
                      width={24}
                      height={24}
                      alt="Tu"
                      src="https://i.pravatar.cc/48"
                    />
                    <small className="nav-label">Tu</small>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow dropdown-menu-touch">
                  <Dropdown.Item href="#">Profilo</Dropdown.Item>
                  <Dropdown.Item href="#">Impostazioni</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Esci</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>

            {/* Per le aziende */}
            <Nav.Item className="px-3 nav-divider-lg d-none d-lg-block">
              <Dropdown align="end" popperConfig={{ strategy: "fixed" }}>
                <Dropdown.Toggle
                  variant="link"
                  className="text-decoration-none text-secondary p-0"
                >
                  <div className="d-flex flex-column align-items-center gap-1">
                    <div className="fs-5">
                      <BsGrid3X3GapFill />
                    </div>
                    <small className="nav-label">Per le aziende</small>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow dropdown-menu-touch">
                  <Dropdown.Item href="#">Pubblica un'offerta</Dropdown.Item>
                  <Dropdown.Item href="#">Soluzioni Marketing</Dropdown.Item>
                  <Dropdown.Item href="#">Learning</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>

            {/* Premium */}
            <Nav.Item className="px-3 d-none d-lg-block">
              <Nav.Link href="#" className="lkd-item px-0">
                <div className="d-flex flex-column align-items-center gap-1">
                  <div className="premium-badge" />
                  <small className="nav-label">Riattiva Premium</small>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Styles marcio */}
      <style>{`
        .linkedin-navbar {
          position: sticky; top: 0; z-index: 1100; width: 100%;
          background-color: #fff !important; border-bottom: 1px solid #e6e6e6;
        }
        .lkd-search-pill {
          display: flex; align-items: center; gap: .5rem;
          background: #fff; border: 1px solid #dcdcdc; border-radius: 999px;
          padding: .375rem .5rem .375rem .75rem;
        }
        .lkd-search-pill:focus-within {
          border-color: #000; box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
        }
        .lkd-search-icon { display: inline-flex; font-size: 1rem; color: #444; }
        .lkd-search-input {
          border: 0; outline: none; background: transparent; width: 100%;
        }
        .lkd-search-input::placeholder { color: #6b6f75; }
        .nav-label { font-size: 11px; color: #666; }
        .lkd-item { color: #666; position: relative; }
        .lkd-item .lkd-icon { color: #666; transition: color .15s ease; }
        .lkd-item:hover .lkd-icon, .lkd-item.active .lkd-icon { color: #000 !important; }
        .lkd-item:hover .nav-label, .lkd-item.active .nav-label { color: #000; }
        .lkd-item.active::after {
          content: ""; position: absolute; left: 12px; right: 12px; bottom: -6px;
          height: 2px; background: #000; border-radius: 2px;
        }
        .nav-divider-lg { border-left: 1px solid #e6e6e6; }
        .premium-badge { width: 18px; height: 18px; background: #f8c77e; border-radius: 3px; }
        .dropdown-menu-touch .dropdown-item { padding: 0.8rem 1rem; }
        @media (max-width: 991.98px) {
          #lkd-nav .navbar-nav {
            flex-direction: row !important;
            justify-content: space-around;
            align-items: center;
            flex-wrap: nowrap;
            width: 100%;
            padding: .25rem 0;
            gap: .25rem;
          }
          #lkd-nav .nav-link { padding: .25rem .5rem; }
          .nav-label { display: none; }
          .nav-divider-lg { border-left: none; }
          .dropdown-menu-touch { 
            position: fixed !important; left: 50% !important; transform: translateX(-50%) !important;
            top: 64px !important; width: 92vw; max-height: 70vh; overflow: auto; border-radius: 12px;
          }
        }
      `}</style>
    </Navbar>
  );
};

export default LinkedInNavbar;
