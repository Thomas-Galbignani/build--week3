const Avatar = ({ src, alt }) => (
  <div
    className="rounded-circle bg-secondary overflow-hidden d-flex align-items-center justify-content-center text-white fw-bold"
    style={{ width: 32, height: 32 }}
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
);

export default function Activity() {
  return (
    <div className="border-bottom">
      {/* header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom flex-wrap gap-2">
        <div>
          <div className="fw-semibold">Attività</div>
          <div className="text-primary small">74 follower</div>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button className="btn btn-sm btn-success">Post</button>
          <button className="btn btn-sm btn-outline-secondary">Commenti</button>
          <button className="btn btn-sm btn-primary ms-2">Crea un post</button>
          <i className="bi bi-pencil"></i>
        </div>
      </div>

      {/* griglia: 1 col xs-md, 2 col da lg in su */}
      <div className="row row-cols-1 row-cols-lg-2 g-3 p-3">
        {/* post 1 */}
        <div className="col">
          <div className="border rounded h-100">
            <div className="p-3">
              <div className="d-flex align-items-start gap-2">
                <Avatar alt="Emanuele Sanna" />
                <div>
                  <div className="fw-semibold">
                    Emanuele Sanna{" "}
                    <i className="bi bi-shield-fill text-primary" />
                  </div>
                  <div className="small text-muted">
                    Junior Full Stack Developer · ICT Consultant
                  </div>
                  <div className="small text-muted">
                    4m · <i className="bi bi-globe" />
                  </div>
                </div>
                <i className="bi bi-three-dots ms-auto" />
              </div>

              <p className="mt-2 mb-1 small">
                It was a real pleasure to attend today’s{" "}
                <span className="text-primary">4Science</span> Academy event…
                I’m already looking forward to the next session!
              </p>
            </div>

            <div className="px-3 py-2 border-top d-flex align-items-center gap-3 small text-muted">
              <div className="ms-auto d-flex gap-3 flex-wrap">
                <span>
                  <i className="bi bi-hand-thumbs-up" /> Mi piace
                </span>
                <span>
                  <i className="bi bi-chat" /> Commenta
                </span>
                <span>
                  <i className="bi bi-share" /> Condividi
                </span>
                <span>
                  <i className="bi bi-send" /> Invia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* post 2 */}
        <div className="col">
          <div className="border rounded h-100">
            <div className="p-3">
              <div className="d-flex align-items-start gap-2">
                <Avatar alt="Emanuele Sanna" />
                <div>
                  <div className="fw-semibold">
                    Emanuele Sanna{" "}
                    <i className="bi bi-shield-fill text-primary" />
                  </div>
                  <div className="small text-muted">
                    Junior Full Stack Developer · ICT Consultant
                  </div>
                  <div className="small text-muted">
                    8m · <i className="bi bi-globe" />
                  </div>
                </div>
                <i className="bi bi-three-dots ms-auto" />
              </div>

              <div className="bg-light border my-2" style={{ height: 150 }} />
              <p className="small mb-1">Festeggio una nuova certificazione</p>
            </div>

            <div className="px-3 py-2 border-top d-flex align-items-center gap-3 small text-muted">
              <div className="ms-auto d-flex gap-3 flex-wrap">
                <span>
                  <i className="bi bi-hand-thumbs-up" /> Mi piace
                </span>
                <span>
                  <i className="bi bi-chat" /> Commenta
                </span>
                <span>
                  <i className="bi bi-share" /> Condividi
                </span>
                <span>
                  <i className="bi bi-send" /> Invia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* sezione sotto */}
      <div className="text-center small py-2 border-top">
        Mostra tutti i post →
      </div>
    </div>
  );
}
