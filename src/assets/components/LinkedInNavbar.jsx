import { useEffect, useRef, useState } from "react"
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import {
  BsLinkedin,
  BsHouseDoorFill,
  BsPeopleFill,
  BsBriefcaseFill,
  BsChatDotsFill,
  BsBellFill,
  BsGrid3X3GapFill,
  BsSearch,
} from "react-icons/bs"

/* Search base */
const SearchBox = ({
  value,
  onChange,
  onSubmit,
  loading,
  suggestions,
  onPickSuggestion,
  error,
}) => (
  <div className="position-relative">
    <div className="lkd-search-pill">
      <span className="lkd-search-icon">
        <BsSearch />
      </span>
      <input
        type="search"
        placeholder="Cerca profilo per nome o username…"
        className="lkd-search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit()
        }}
      />
      {loading && <small className="text-muted ms-2 me-1">cerca…</small>}
    </div>

    {/* Dropdown suggerimenti */}
    {(suggestions.length > 0 || error) && (
      <div className="search-suggestions shadow-sm">
        {error && (
          <div className="px-3 py-2 small text-danger border-bottom">
            {error}
          </div>
        )}
        {suggestions.slice(0, 6).map((p) => (
          <button
            key={p._id}
            type="button"
            className="w-100 text-start px-3 py-2 suggestion-item"
            onClick={() => onPickSuggestion(p)}
            title={`${p.name} ${p.surname}`}
          >
            <div className="d-flex align-items-center gap-2">
              <img
                src={
                  p.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                }
                alt=""
                width={28}
                height={28}
                style={{ objectFit: "cover", borderRadius: 999 }}
              />
              <div className="d-flex flex-column">
                <span className="small fw-semibold">
                  {p.name} {p.surname}
                </span>
                <span className="small text-muted">
                  @{p.username || "—"} · {p.title || "—"}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    )}

    <style>{`
      .search-suggestions {
        position: absolute; left: 0; right: 0; top: calc(100% + 6px);
        background: #fff; border: 1px solid #e6e6e6; border-radius: 12px; z-index: 1200;
        max-height: 60vh; overflow: auto;
      }
      .suggestion-item {
        background: #fff; border: 0; outline: none;
      }
      .suggestion-item:hover { background: #f6f6f6; }
    `}</style>
  </div>
)

const LinkedInNavbar = ({ token, onSelectProfile }) => {
  const location = useLocation()
  const active =
    location.pathname === "/"
      ? "home"
      : location.pathname.startsWith("/profile")
      ? "profile"
      : ""
  const [q, setQ] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const abortRef = useRef(null)
  const [meImage, setMeImage] = useState("")

  const normalized = (s) =>
    (s || "")
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()

  const fetchAllProfiles = async () => {
    if (!token) throw new Error("Token mancante")
    const url = "https://striveschool-api.herokuapp.com/api/profile/"
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: abortRef.current?.signal,
    })
    if (!res.ok) {
      const t = await res.text()
      throw new Error(`Errore API (${res.status}): ${t}`)
    }
    const arr = await res.json()
    return Array.isArray(arr) ? arr : []
  }

  const runSearch = async () => {
    try {
      setLoading(true)
      setError("")
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new AbortController()

      const all = await fetchAllProfiles()
      const nq = normalized(q)
      const filtered = all.filter((p) => {
        const full = normalized(`${p.name} ${p.surname}`)
        const uname = normalized(p.username)
        const title = normalized(p.title)
        const area = normalized(p.area)
        return (
          full.includes(nq) ||
          (uname && uname.includes(nq)) ||
          (title && title.includes(nq)) ||
          (area && area.includes(nq))
        )
      })

      setSuggestions(filtered)
      if (filtered.length === 1) {
        onSelectProfile?.(filtered[0])
      } else if (filtered.length === 0) {
        setError("Nessun profilo trovato.")
      }
    } catch (e) {
      if (e.name !== "AbortError") setError(e.message || "Errore di ricerca")
    } finally {
      setLoading(false)
    }
  }

  // debounce suggerimenti mentre si digita
  useEffect(() => {
    if (!q.trim()) {
      setSuggestions([])
      setError("")
      return
    }
    const id = setTimeout(() => {
      runSearch()
    }, 300)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  // immagine utente per avatar "Tu"
  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (!token) return
        const res = await fetch(
          "https://striveschool-api.herokuapp.com/api/profile/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        if (!res.ok) return
        const data = await res.json()
        if (data?.image) setMeImage(data.image)
      } catch {
        /* ignore */
      }
    }
    fetchMe()
  }, [token])

  const IconItem = ({ icon, label, eventKey, to }) => (
    <Nav.Link
      as={to ? Link : undefined}
      to={to}
      eventKey={eventKey}
      className={`lkd-item px-3 ${active === eventKey ? "active" : ""}`}
    >
      <div className="d-flex flex-column align-items-center gap-1">
        <span className="lkd-icon fs-5">{icon}</span>
        <small className="nav-label">{label}</small>
      </div>
    </Nav.Link>
  )

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
            <SearchBox
              value={q}
              onChange={setQ}
              onSubmit={runSearch}
              loading={loading}
              error={error}
              suggestions={suggestions}
              onPickSuggestion={(p) => {
                onSelectProfile?.(p)
                setSuggestions([])
              }}
            />
          </div>
        </div>

        <Navbar.Toggle aria-controls="lkd-nav" />

        {/* Destra */}
        <Navbar.Collapse id="lkd-nav">
          <Nav className="ms-auto align-items-center" activeKey={active}>
            <IconItem
              icon={<BsHouseDoorFill />}
              label="Home"
              eventKey="home"
              to="/"
            />
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
              <Dropdown align="end">
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
                      src={
                        meImage ||
                        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                      }
                    />
                    <small className="nav-label">Tu</small>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow dropdown-menu-touch">
                  <Dropdown.Item
                    as={Link}
                    to="/profile"
                    onClick={() => onSelectProfile?.(null)}
                  >
                    Profilo
                  </Dropdown.Item>
                  <Dropdown.Item href="#">Impostazioni</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Esci</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>

            {/* Per le aziende */}
            <Nav.Item className="px-3 nav-divider-lg d-none d-lg-block">
              <Dropdown align="end">
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

      {/* Styles originali + piccoli extra */}
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
        .lkd-search-input { border: 0; outline: none; background: transparent; width: 100%; }
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
            flex-direction: row !important; justify-content: space-around;
            align-items: center; flex-wrap: nowrap; width: 100%;
            padding: .25rem 0; gap: .25rem;
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
  )
}

export default LinkedInNavbar
