import GetYourId from "../functions/GetYourId";
import ModalFormExperiences from "./ModalFormExperiences";
import { useState, useEffect, useMemo } from "react";

const ExperienceItem = ({ role, org, period, place, mode, bullets }) => (
  <div className="d-flex gap-3 py-3 border-bottom">
    <div
      className="rounded bg-secondary text-white d-flex align-items-center justify-content-center"
      style={{ width: 40, height: 40 }}
    >
      {org?.[0] || "·"}
    </div>
    <div>
      <div className="fw-semibold">{role}</div>
      <div className="small text-muted">
        {org} · {period}
      </div>
      <div className="small text-muted">
        {place} {mode ? `· ${mode}` : ""}
      </div>
      {bullets?.length > 0 && (
        <ul className="small mt-2 mb-0 ps-3">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const API_URL = "https://striveschool-api.herokuapp.com/api/profile/";
const AbbronzatoKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI2ZWYyODU2MzA1YzAwMTU1ODgzNTUiLCJpYXQiOjE3NTY4MTkyNDAsImV4cCI6MTc1ODAyODg0MH0.mJDQJKbzQs0cNjxS0dB4A7-DFPVUYsM0hZGX7abJwLY";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZlYjk5MDE2MjdjNjAwMTVmOGM1ODEiLCJpYXQiOjE3MDQ3MTY0ODksImV4cCI6MTcwNTkyNjA4OX0.33_d5T1n8f3y_hT3j_xS8j_t2q_W2T3y_j3j_j3_q3";

export default function Experience({ profileId = null }) {
  const [myId, setMyId] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // L'ID effettivamente visualizzato: se arriva dal search lo usiamo, altrimenti il mio.
  const targetId = useMemo(() => profileId ?? myId, [profileId, myId]);
  // Posso modificare solo se sto guardando me stesso
  const canEdit = Boolean(myId && targetId && myId === targetId);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await GetYourId();
        setMyId(id);
      } catch (e) {
        console.error("Impossibile ottenere il mio ID:", e);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!targetId) return;

    const controller = new AbortController();
    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}${targetId}/experiences`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AbbronzatoKey}`,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setExperiences(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Errore durante il recupero delle esperienze:", err);
          setError("Impossibile caricare le esperienze.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [targetId]);

  if (isLoading) {
    return <div className="p-3">Caricamento...</div>;
  }

  if (error) {
    return <div className="p-3 text-danger">{error}</div>;
  }

  return (
    <div className="border-bottom">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <span className="fw-semibold">Esperienze</span>
        <div className="d-flex gap-2">
          {/* Mostra il modal di modifica SOLO se sto guardando il mio profilo */}
          {canEdit && <ModalFormExperiences />}
        </div>
      </div>

      <div className="p-0">
        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              role={exp.role}
              org={exp.company}
              period={exp.startDate}
              place={exp.area}
              mode={exp.workType}
              bullets={exp.description ? [exp.description] : []}
            />
          ))
        ) : (
          <div className="p-3 text-muted">Nessuna esperienza trovata.</div>
        )}
      </div>
    </div>
  );
}
