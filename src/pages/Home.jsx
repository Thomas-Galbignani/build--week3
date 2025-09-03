import { useEffect, useState } from "react"
import Posts from "../assets/components/Posts.jsx"
import NewPostForm from "../assets/components/NewPostForm.jsx"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function Home({ token }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [profilesByUsername, setProfilesByUsername] = useState({})
  const [me, setMe] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError("")
        const res = await fetch(
          "https://striveschool-api.herokuapp.com/api/posts/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        if (!res.ok) throw new Error(`Errore API: ${res.status}`)
        const data = await res.json()
        setPosts(Array.isArray(data) ? data.reverse() : [])
      } catch (e) {
        setError(e.message || "Errore nel caricamento dei post")
      } finally {
        setLoading(false)
      }
    }
    const fetchProfiles = async () => {
      try {
        const res = await fetch(
          "https://striveschool-api.herokuapp.com/api/profile/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        if (!res.ok) return
        const arr = await res.json()
        if (Array.isArray(arr)) {
          const map = {}
          for (const p of arr) {
            if (p?.username) map[p.username] = p
          }
          setProfilesByUsername(map)
        }
      } catch {}
    }
    const fetchMe = async () => {
      try {
        const payload = JSON.parse(atob((token || "").split(".")[1] || ""))
        const myId = payload?._id
        if (!myId) return
        const res = await fetch(
          `https://striveschool-api.herokuapp.com/api/profile/${myId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (!res.ok) return
        const profile = await res.json()
        setMe(profile)
      } catch {}
    }
    if (token) {
      fetchPosts()
      fetchProfiles()
      fetchMe()
    }
  }, [token])

  if (!token) return <div className="py-3">Token mancante</div>
  if (loading) return <div className="py-3">Caricamento…</div>
  if (error) return <div className="py-3 text-danger">{error}</div>

  return (
    <Container className="py-3">
      <Row className="g-4">
        <Col xs={12} lg={3}>
          <Card
            className="shadow-sm overflow-hidden position-relative p-0"
            style={{ margin: 0 }}
          >
            <div className="position-relative" style={{ height: "50%" }}>
              <img
                src="https://www.20i.com/blog/wp-content/uploads/2021/04/burst.jpg"
                alt="cover"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
              <div
                className="position-absolute"
                style={{ left: 16, bottom: -36 }}
              >
                {me?.image ? (
                  <img
                    src={me.image}
                    alt="Tu"
                    width={72}
                    height={72}
                    className="rounded-circle border border-2 border-white"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center text-white border border-2 border-white"
                    style={{ width: 72, height: 72 }}
                  >
                    {(me?.name || "A").charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <div
              className="px-3 pb-3 text-start"
              style={{ padding: "48px 12px 12px 96px" }}
            >
              <div className="fw-semibold">
                {me ? `${me.name} ${me.surname}` : "Tu"}
              </div>
              <div className="small text-muted">{me?.title || ""}</div>
              <div className="small text-muted">{me?.area || ""}</div>
            </div>
          </Card>
        </Col>

        <Col xs={12} lg={6}>
          <NewPostForm
            token={token}
            onCreated={(created) => setPosts((prev) => [created, ...prev])}
            userImage={me?.image}
            userName={me ? `${me.name} ${me.surname}` : "Tu"}
          />
          <Posts
            posts={posts}
            profilesByUsername={profilesByUsername}
            myUsername={me?.username}
            token={token}
            onDeleted={(id) =>
              setPosts((prev) => prev.filter((p) => p._id !== id))
            }
            onUpdated={(updated) =>
              setPosts((prev) =>
                prev.map((p) => (p._id === updated._id ? updated : p))
              )
            }
          />
        </Col>

        <Col xs={12} lg={3}>
          <Sidebar />
        </Col>
      </Row>
    </Container>
  )
}
