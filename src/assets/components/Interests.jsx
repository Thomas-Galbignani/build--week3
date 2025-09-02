const Company = ({ logoBg, name, followers }) => (
  <div className="d-flex align-items-center gap-3 py-3">
    <div className="rounded d-flex align-items-center justify-content-center"
         style={{ width: 40, height: 40, background: logoBg }}>
      <i className="bi bi-building text-white"></i>
    </div>
    <div className="flex-grow-1">
      <div className="fw-semibold">{name}</div>
      <div className="small text-muted">{followers} follower</div>
      <button className="btn btn-sm btn-outline-secondary mt-1">
        <i className="bi bi-check2 me-1"></i>Già segui
      </button>
    </div>
  </div>
);

export default function Interests() {
  return (
    <div className="border-bottom">
      <div className="p-3 border-bottom">
        <div className="fw-semibold mb-2">Interessi</div>

        <ul className="nav nav-tabs small">
          <li className="nav-item">
            <button className="nav-link active" type="button">Aziende</button>
          </li>
          <li className="nav-item"><button className="nav-link" type="button">Gruppi</button></li>
          <li className="nav-item"><button className="nav-link" type="button">Newsletter</button></li>
          <li className="nav-item"><button className="nav-link" type="button">Scuole o università</button></li>
        </ul>
      </div>

      <div className="p-3 row">
        <div className="col-12 col-md-6">
          <Company name="Accenture" followers="13.745.843" logoBg="#7a2cff" />
        </div>
        <div className="col-12 col-md-6">
          <Company name="Microsoft" followers="26.228.627" logoBg="#28a745" />
        </div>
      </div>

      <div className="text-center small py-2">
        Mostra tutte le aziende →
      </div>
    </div>
  );
}
