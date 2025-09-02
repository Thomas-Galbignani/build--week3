const EducationItem = ({ title, subtitle, grade }) => (
  <div className="d-flex gap-3 py-3 border-bottom">
    <div className="rounded bg-primary text-white d-flex align-items-center justify-content-center"
         style={{ width: 40, height: 40 }}>UNICA</div>
    <div>
      <div className="fw-semibold">{title}</div>
      <div className="small text-muted">{subtitle}</div>
      <div className="small">Votazione: {grade}</div>
      <div className="small text-muted">💎 Comunicazione, Microsoft Word e +3 competenze</div>
    </div>
  </div>
);

export default function Education() {
  return (
    <div className="border-bottom">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <span className="fw-semibold">Formazione</span>
        <div className="d-flex gap-2"><i className="bi bi-plus"></i><i className="bi bi-pencil"></i></div>
      </div>

      <div className="p-0">
        <EducationItem
          title="Università degli Studi di Cagliari"
          subtitle="Laurea Magistrale, Storia e Società. Curriculum archivistico documentale"
          grade="109/110"
        />
        <EducationItem
          title="Università degli Studi di Cagliari"
          subtitle="Laurea Triennale, Beni Culturali. Curriculum archivistico documentale"
          grade="110/110"
        />
        <div className="text-center small py-2">Mostra tutti i titoli di studio (4) →</div>
      </div>
    </div>
  );
}
