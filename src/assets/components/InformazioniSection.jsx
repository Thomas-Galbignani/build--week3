import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { Pencil, Gem } from "react-bootstrap-icons";

const InformazioniSection = ({ token, profile }) => {
  const [bio, setBio] = useState(profile?.bio || "");
  const [loading, setLoading] = useState(!profile);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || "");
      setLoading(false);
      setError("");
      return;
    }
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const tk = token || localStorage.getItem("STRIVE_TOKEN");
        if (!tk) throw new Error("Token mancante");
        const res = await fetch(
          "https://striveschool-api.herokuapp.com/api/profile/me",
          {
            headers: { Authorization: `Bearer ${tk}` },
          }
        );
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Errore API (${res.status}): ${txt}`);
        }
        const me = await res.json();
        setBio(me?.bio || "");
      } catch (e) {
        setError(e.message || "Errore caricamento");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, profile]);

  return (
    <Card className="border rounded mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center bg-white">
        <span className="fw-bold">Informazioni</span>
        <Pencil className="text-secondary" />
      </Card.Header>

      <Card.Body className="text-start">
        {loading ? (
          <div className="d-flex align-items-center gap-2">
            <Spinner size="sm" /> <small>Caricamento…</small>
          </div>
        ) : error ? (
          <small className="text-danger">{error}</small>
        ) : (
          <>
            <Card.Text className="mb-0">
              {bio?.trim() ? (
                bio
              ) : (
                <span className="text-muted">
                  Nessuna informazione disponibile.
                </span>
              )}
            </Card.Text>

            <div className="mt-3 d-flex align-items-center">
              <Gem className="me-2 text-secondary" />
              <span className="fw-bold">Competenze principali</span>
            </div>
            <div className="mt-2">
              <small>Teamwork da remoto</small> <small>·</small>{" "}
              <small>Lingua inglese</small> <small>·</small>{" "}
              <small>Service Desk</small> <small>·</small> <small>ICT</small>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default InformazioniSection;
