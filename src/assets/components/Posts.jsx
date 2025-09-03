import { useState } from "react"
const Avatar = ({ src, alt }) => (
  <div
    className="rounded-circle bg-secondary overflow-hidden d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
    style={{ width: 30, height: 30 }}
  >
    {src ? (
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      alt?.[0] ?? "U"
    )}
  </div>
)

export default function Posts({
  posts = [],
  profilesByUsername = {},
  myUsername,
  token,
  onDeleted,
  onUpdated,
}) {
  const [visibleCount, setVisibleCount] = useState(20)
  const visiblePosts = posts.slice(0, visibleCount)
  const parseDateParts = (iso) => {
    try {
      const d = iso ? new Date(iso) : null
      if (!d || isNaN(d.getTime())) return { date: "", time: "" }
      const date = d.toLocaleDateString()
      const time = d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      return { date, time }
    } catch {
      return { date: "", time: "" }
    }
  }

  return (
    <div>
      <div className="row g-3 p-3">
        {visiblePosts.map((post) => (
          <div key={post._id} className="col-12 col-md-6">
            <div className="border rounded h-100 d-flex flex-column">
              <div className="p-3 text-start">
                <div className="d-flex align-items-start gap-2">
                  {(() => {
                    const authorUsername = post.username || myUsername
                    const prof = profilesByUsername[authorUsername] || {}
                    return (
                      <Avatar
                        src={prof.image}
                        alt={prof.name || authorUsername || "U"}
                      />
                    )
                  })()}
                  <div>
                    <div className="fw-semibold">
                      {(() => {
                        const authorUsername = post.username || myUsername
                        const prof = profilesByUsername[authorUsername]
                        if (prof?.name && prof?.surname) {
                          return `${prof.name} ${prof.surname}`
                        }
                        return authorUsername || "Utente"
                      })()}
                    </div>
                    {(() => {
                      const { date, time } = parseDateParts(
                        post.createdAt || post.updatedAt
                      )
                      return (
                        <div className="small text-muted">
                          {`${date} ${time}`.trim()}
                        </div>
                      )
                    })()}
                  </div>
                  <PostActions
                    canManage={
                      myUsername === post.username || post.__localOwner
                    }
                    post={post}
                    token={token}
                    onUpdated={onUpdated}
                    onDeleted={onDeleted}
                  />
                </div>

                {post.image && (
                  <div className="my-2">
                    <div
                      className="w-100 border rounded overflow-hidden"
                      style={{ maxHeight: 420 }}
                    >
                      <img
                        src={post.image}
                        alt="media"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          objectFit: "contain",
                          background: "#f8f9fa",
                        }}
                      />
                    </div>
                  </div>
                )}
                {post.text && (
                  <p className="mt-2 mb-1 small text-wrap">{post.text}</p>
                )}
              </div>

              <div className="px-2 py-2 border-top mt-auto">
                <div
                  className="d-flex align-items-center justify-content-around text-muted"
                  style={{ fontSize: 18 }}
                >
                  <button type="button" className="btn btn-link text-muted p-2">
                    <i className="bi bi-hand-thumbs-up" />
                  </button>
                  <button type="button" className="btn btn-link text-muted p-2">
                    <i className="bi bi-chat" />
                  </button>
                  <button type="button" className="btn btn-link text-muted p-2">
                    <i className="bi bi-share" />
                  </button>
                  <button type="button" className="btn btn-link text-muted p-2">
                    <i className="bi bi-send" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {posts.length === 0 && (
        <div className="text-center small py-2 border-top">Nessun post</div>
      )}
      {posts.length > visibleCount && (
        <div className="text-center py-3 border-top">
          <button
            type="button"
            className="btn btn-outline-secondary rounded-pill px-4"
            onClick={() =>
              setVisibleCount((c) => Math.min(c + 20, posts.length))
            }
          >
            Mostra altri 20 post
          </button>
        </div>
      )}
      {posts.length > 0 && posts.length <= visibleCount && (
        <div className="text-center small py-2 border-top">
          Hai visto tutti i post
        </div>
      )}
    </div>
  )
}

function PostActions({ canManage, post, token, onUpdated, onDeleted }) {
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [saving, setSaving] = useState(false)
  const [text, setText] = useState(post.text || "")

  const updatePost = async () => {
    try {
      setSaving(true)
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text }),
        }
      )
      if (!res.ok) throw new Error("Errore update")
      const updated = await res.json()
      onUpdated?.(updated)
      setShowEdit(false)
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  const deletePost = async () => {
    try {
      setSaving(true)
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/${post._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!res.ok) throw new Error("Errore delete")
      onDeleted?.(post._id)
      setShowDelete(false)
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="ms-auto d-flex align-items-center gap-1">
      {canManage && (
        <>
          <button
            type="button"
            className="btn btn-sm btn-light border"
            title="Modifica"
            onClick={() => setShowEdit(true)}
          >
            <i className="bi bi-pencil" />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-light border"
            title="Elimina"
            onClick={() => setShowDelete(true)}
          >
            <i className="bi bi-trash" />
          </button>

          {showEdit && (
            <div
              className="modal d-block"
              tabIndex="-1"
              role="dialog"
              style={{
                background: "rgba(0,0,0,.35)",
                position: "fixed",
                inset: 0,
                zIndex: 1300,
              }}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title">Modifica post</h6>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowEdit(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <textarea
                      className="form-control"
                      rows={4}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowEdit(false)}
                      disabled={saving}
                    >
                      Annulla
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={updatePost}
                      disabled={saving || !text.trim()}
                    >
                      {saving ? "Salvo…" : "Salva"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showDelete && (
            <div
              className="modal d-block"
              tabIndex="-1"
              role="dialog"
              style={{
                background: "rgba(0,0,0,.35)",
                position: "fixed",
                inset: 0,
                zIndex: 1300,
              }}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title">Elimina post</h6>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowDelete(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <p className="mb-0">
                      Sei sicuro di voler eliminare questo post?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowDelete(false)}
                      disabled={saving}
                    >
                      Annulla
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={deletePost}
                      disabled={saving}
                    >
                      {saving ? "Elimino…" : "Elimina"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
