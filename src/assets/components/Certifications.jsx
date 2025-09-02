const CertificationItem = ({ title, org, date, skills, file }) => (
  <div className="d-flex gap-3 py-3 border-bottom">
    <div className="rounded bg-light d-flex align-items-center justify-content-center"
         style={{ width: 40, height: 40 }}>
      <i className="bi bi-award text-primary fs-5"></i>
    </div>
    <div className="flex-grow-1">
      <div className="fw-semibold">{title}</div>
      <div className="small">{org}</div>
      <div className="small text-muted">Data di rilascio: {date}</div>
      <div className="small text-muted">💎 {skills}</div>
      <div className="small text-truncate text-primary">{file}</div>
    </div>
  </div>
);

export default function Certifications() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <span className="fw-semibold">Licenze e certificazioni</span>
        <div className="d-flex gap-2"><i className="bi bi-plus"></i><i className="bi bi-pencil"></i></div>
      </div>

      <div className="p-0">
        <CertificationItem
          title="Full-Stack Developer & AI React Testing / State elevation / React Router / React components / Redux"
          org="EPICODE Institute of Technology"
          date="ago 2025"
          skills="React, Testing e +1 competenza"
          file="e068ec02-465d-4b16-a0e4-8c23f877cfc.pdf"
        />
        <CertificationItem
          title="Full-Stack Developer & AI Reducers / Redux / Typescript"
          org="EPICODE Institute of Technology"
          date="ago 2025"
          skills="Redux e Typescript"
          file="977ab284-f909-4fd5-bc56-82cf09205bb1.pdf"
        />
      </div>

      <div className="text-center small py-2">Mostra tutte le licenze e certificazioni (24) →</div>
    </div>
  );
}
