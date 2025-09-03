import { useState } from "react"

export default function NewPostForm({ token, onCreated, userImage, userName }) {
  const [text, setText] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [open, setOpen] = useState(false)

  const canSubmit = text.trim().length > 0 && !submitting

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    try {
      setSubmitting(true)
      setError("")
      const base = "https://striveschool-api.herokuapp.com/api/posts/"

      const createRes = await fetch(base, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: text.trim() }),
      })
      if (!createRes.ok) throw new Error(`Errore API: ${createRes.status}`)
      let created = await createRes.json()

      if (imageFile && created?._id) {
        const fieldCandidates = ["post", "image", "picture", "file"]
        let uploadedOk = false
        for (const field of fieldCandidates) {
          const form = new FormData()
          form.append(field, imageFile)
          const upRes = await fetch(`${base}${created._id}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: form,
          })
          if (upRes.ok) {
            uploadedOk = true
            try {
              const r = await fetch(`${base}${created._id}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              if (r.ok) created = await r.json()
            } catch {}
            break
          }
        }
        if (!uploadedOk) {
          throw new Error("Upload immagine non riuscito")
        }
      }

      try {
        const finalRes = await fetch(`${base}${created._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (finalRes.ok) {
          created = await finalRes.json()
        }
      } catch {}

      onCreated?.({ ...created, __localOwner: true })
      setText("")
      setImageFile(null)
      setOpen(false)
    } catch (e) {
      setError(e.message || "Errore nella creazione del post")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="border rounded mb-3 bg-white">
      <div className="d-flex align-items-center gap-2 p-3">
        {userImage ? (
          <img
            src={userImage}
            alt={userName || "Tu"}
            width={48}
            height={48}
            className="rounded-circle"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-semibold"
            style={{ width: 48, height: 48 }}
            aria-label={userName || "Tu"}
          >
            {(userName || "A").charAt(0).toUpperCase()}
          </div>
        )}
        <input
          type="text"
          className="form-control bg-white border rounded-pill px-3 py-2 shadow-sm"
          placeholder="Crea un post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              if (text.trim()) {
                handleSubmit(e)
              }
            }
          }}
          disabled={submitting}
        />
      </div>

      <div className="d-flex align-items-center justify-content-between px-3 pb-3 small">
        <button
          type="button"
          className="btn btn-light d-flex align-items-center gap-2 px-3 py-2 border-0"
        >
          <i className="bi bi-camera-video text-primary" /> Video
        </button>
        <label
          className="btn btn-light d-flex align-items-center gap-2 px-3 py-2 border-0 mb-0"
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-image text-success" /> Foto
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            style={{ display: "none" }}
          />
        </label>
        <button
          type="button"
          className="btn btn-light d-flex align-items-center gap-2 px-3 py-2 border-0"
        >
          <i className="bi bi-file-earmark-text text-warning" /> Scrivi un
          articolo
        </button>
      </div>
      {imageFile && (
        <div className="px-3 pb-3">
          <div className="d-inline-flex align-items-center gap-2 border rounded-pill px-2 py-1 bg-light">
            <i className="bi bi-image text-success" />
            <span className="small text-truncate" style={{ maxWidth: 220 }}>
              {imageFile.name}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary rounded-pill py-0"
              onClick={() => setImageFile(null)}
            >
              Rimuovi
            </button>
          </div>
        </div>
      )}
      {error && <div className="text-danger small px-3 pb-3">{error}</div>}
    </div>
  )
}
