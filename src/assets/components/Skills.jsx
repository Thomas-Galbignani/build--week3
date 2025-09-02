const SkillRow = ({ name, course }) => (
  <div className="d-flex gap-3 align-items-start py-3 border-bottom">
    <div className="rounded bg-light d-flex align-items-center justify-content-center"
         style={{ width: 28, height: 28 }}>
      <i className="bi bi-lightning-charge-fill text-primary"></i>
    </div>
    <div className="flex-grow-1">
      <div className="fw-semibold">{name}</div>
      <div className="small text-muted">
        <i className="bi bi-award-fill me-1 text-primary"></i>
        {course}
      </div>
    </div>
  </div>
);

export default function Skills() {
  return (
    <div className="border-bottom">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <span className="fw-semibold">Competenze</span>
        <div className="d-flex gap-2">
          <i className="bi bi-plus"></i>
          <i className="bi bi-pencil"></i>
        </div>
      </div>

      <div className="p-0">
        <SkillRow
          name="Redux"
          course="Full-Stack Developer & AI Reducers / Redux / Typescript"
        />
        <SkillRow
          name="Typescript"
          course="Full-Stack Developer & AI Reducers / Redux / Typescript"
        />
      </div>
      <div className="text-center small py-2">
        Mostra tutte le competenze (76) →
      </div>
    </div>
  );
}
