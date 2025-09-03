import GetYourId from "../functions/GetYourId";
import ModalFormExperiences from "./ModalFormExperiences";
import { useState, useEffect, useMemo } from "react";
import { ImPencil } from "react-icons/im";
import { FaTrashCan, FaPlus } from "react-icons/fa6";


const API_URL = "https://striveschool-api.herokuapp.com/api/profile/";
const AbbronzatoKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI2ZWYyODU2MzA1YzAwMTU1ODgzNTUiLCJpYXQiOjE3NTY4MTkyNDAsImV4cCI6MTc1ODAyODg0MH0.mJDQJKbzQs0cNjxS0dB4A7-DFPVUYsM0hZGX7abJwLY";

const ExperienceItem = ({ exp, canEdit, onDelete, onEdit }) => {
  return (
    <div className="d-flex gap-3 py-3 border-bottom align-items-start">
      <div
        className="rounded bg-secondary text-white d-flex align-items-center justify-content-center flex-shrink-0"
        style={{ width: 40, height: 40 }}
      >
        {exp.company?.[0]}
      </div>
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between">
          <div className="fw-semibold">{exp.role}</div>
          {canEdit && (
            <div className="d-flex gap-2">
              <ImPencil
                className="text-muted cursor-pointer"
                onClick={() => onEdit(exp)}
              />
              <FaTrashCan
                className="text-danger cursor-pointer"
                onClick={() => onDelete(exp._id)}
              />
            </div>
          )}
        </div>
        <div className="small text-muted">
          {exp.company}
        </div>
        <div className="small text-muted">
          {exp.area} {exp.workType ? `${exp.workType}` : ""}
        </div>
        {exp.description && (
          <ul className="small mt-2 mb-0 ps-0 list-unstyled">
            <li className="d-flex">
              <span className="me-2">•</span>
              <span className="text-wrap">{exp.description}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default function Experience({ profileId = null }) {
  const [myId, setMyId] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  const targetId = useMemo(() => profileId ?? myId, [profileId, myId]);
  const canEdit = Boolean(myId && targetId && myId === targetId);

  const fetchExperiences = async () => {
    if (!targetId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}${targetId}/experiences`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AbbronzatoKey}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setExperiences(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Errore durante il recupero delle esperienze:", err);
      setError("Impossibile caricare le esperienze.");
    } finally {
      setIsLoading(false);
    }
  };

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
    if (targetId) {
      fetchExperiences();
    }
  }, [targetId]);

  const handleNewExp = () => {
    setSelectedExp(null);
    setShowModal(true);
  };

  const handleEdit = (exp) => {
    setSelectedExp(exp);
    setShowModal(true);
  };

  const handleDelete = async (expId) => {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare questa esperienza?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}${targetId}/experiences/${expId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${AbbronzatoKey}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setExperiences((prev) => prev.filter((exp) => exp._id !== expId));
    } catch (err) {
      console.error("Errore durante l'eliminazione:", err);
      alert("Impossibile eliminare l'esperienza.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedExp(null);
  };

  const handleUpdateExperiencesList = () => {
    fetchExperiences();
  };

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
          {canEdit && (
            <FaPlus
              className="fs-4 text-primary cursor-pointer"
              onClick={handleNewExp}
            />
          )}
        </div>
      </div>
      <div className="p-0">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <ExperienceItem
              key={exp._id}
              exp={exp}
              canEdit={canEdit}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <div className="p-3 text-muted">Nessuna esperienza trovata.</div>
        )}
      </div>
      {showModal && (
        <ModalFormExperiences
          experience={selectedExp}
          onClose={handleModalClose}
          onUpdate={handleUpdateExperiencesList}
          userId={targetId}
        />
      )}
    </div>
  );
}