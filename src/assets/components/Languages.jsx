export default function Languages() {
  return (
    <div className="border-bottom">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <span className="fw-semibold">Lingue</span>
        <div className="d-flex gap-2">
          <i className="bi bi-plus"></i>
          <i className="bi bi-pencil"></i>
        </div>
      </div>

      <div className="p-3">
        <div className="mb-3">
          <div className="fw-semibold">Francese</div>
          <div className="small text-muted">Conoscenza base</div>
        </div>

        <hr className="my-2" />

        <div>
          <div className="fw-semibold">Inglese</div>
          <div className="small text-muted">Conoscenza professionale completa</div>
        </div>
      </div>

      <div className="text-center small py-2">
        Mostra tutte le lingue (4) →
      </div>
    </div>
  );
}
