import { useEffect, useRef, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { ImPencil } from "react-icons/im";
import { MdOutlineVerifiedUser } from "react-icons/md";

const FALLBACK_BG =
  "https://www.20i.com/blog/wp-content/uploads/2021/04/burst.jpg";
const FALLBACK_AVATAR =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

const MAX_FILE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const Hero = ({ token, profile }) => {
  // self = /me; view = profilo attualmente mostrato
  const [self, setSelf] = useState(null);
  const [view, setView] = useState(profile || null);

  const [loadingSelf, setLoadingSelf] = useState(!profile); // carichiamo /me solo se serve
  const [loadingView, setLoadingView] = useState(!profile);
  const [error, setError] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const fileInputRef = useRef(null);

  // 1) carica SEMPRE /me (serve per sapere se posso editare)
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setError("Token mancante");
        setLoadingSelf(false);
        return;
      }
      try {
        setLoadingSelf(true);
        const res = await fetch(
          "https://striveschool-api.herokuapp.com/api/profile/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Errore API (${res.status}): ${txt}`);
        }
        const data = await res.json();
        setSelf(data);
        // se non ho ancora una view (nessun profilo passato), uso /me
        if (!profile) setView(data);
      } catch (e) {
        setError(e.message || "Errore di caricamento profilo");
      } finally {
        setLoadingSelf(false);
      }
    };
    fetchMe();
    // eslint-disable-next-line
  }, [token]); // ricarica quando cambia il token

  // 2) quando cambia la prop `profile`, aggiornare la view
  useEffect(() => {
    if (profile) {
      setView(profile);
      setLoadingView(false);
      setError("");
    } else {
      // se non c'è un profilo dalla search, mostra se stesso
      if (self) setView(self);
      setLoadingView(false);
    }
  }, [profile, self]);

  const canEdit = useMemo(
    () => !!view?._id && !!self?._id && view._id === self._id,
    [view, self]
  );

  const onPickImage = () => {
    if (!canEdit) return;
    fileInputRef.current?.click();
  };

  const validateFile = (file) => {
    if (!file) return "Nessun file selezionato";
    if (!ACCEPTED_TYPES.includes(file.type))
      return "Formato non supportato (usa JPG, PNG, WEBP o GIF)";
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_FILE_MB)
      return `File troppo grande: ${sizeMb.toFixed(
        1
      )} MB (max ${MAX_FILE_MB} MB)`;
    return null;
  };

  const handleFileChange = async (e) => {
    if (!canEdit) {
      e.target.value = "";
      setUploadError("Non puoi modificare l'immagine di un altro profilo.");
      return;
    }
    const file = e.target.files?.[0];
    e.target.value = "";
    setUploadError("");
    const v = validateFile(file);
    if (v) return setUploadError(v);

    if (!view?._id) return setUploadError("ID utente non disponibile");

    const formData = new FormData();
    formData.append("profile", file);

    try {
      setUploading(true);
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${view._id}/picture`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Errore upload (${res.status}): ${txt}`);
      }
      const data = await res.json();

      // aggiorno sia view che self se coincidono
      if (data?.image) {
        setView((prev) => (prev ? { ...prev, image: data.image } : prev));
        if (canEdit)
          setSelf((prev) => (prev ? { ...prev, image: data.image } : prev));
      } else {
        // fallback: ricarico /me per avere l'immagine aggiornata
        try {
          const r2 = await fetch(
            "https://striveschool-api.herokuapp.com/api/profile/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (r2.ok) {
            const meData = await r2.json();
            setSelf(meData);
            if (canEdit) setView(meData);
          }
        } catch {
          /* ignore */
        }
      }
    } catch (err) {
      setUploadError(err.message || "Errore durante il caricamento");
    } finally {
      setUploading(false);
    }
  };

  if (loadingSelf || loadingView) return <div>Caricamento…</div>;
  if (error) return <div className="text-danger">{error}</div>;

  const fullName = `${view?.name ?? ""} ${view?.surname ?? ""}`.trim();
  const title = view?.title || "—";
  const area = view?.area || "—";
  const avatar = view?.image || FALLBACK_AVATAR;

  return (
    <Container fluid className="bg-white p-0 rounded-4 shadow-sm">
      <div className="position-relative" style={{ height: "20em" }}>
        <Image
          src={FALLBACK_BG}
          className="w-100 h-100 object-fit-cover rounded-top-4"
          alt="Copertina profilo"
        />
        {canEdit && (
          <Button
            variant="light"
            className="rounded-circle position-absolute me-3 mt-3 top-0 end-0 py-2 text-primary"
            onClick={onPickImage}
            aria-label="Modifica immagine profilo"
            disabled={uploading}
          >
            {uploading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <ImPencil />
            )}
          </Button>
        )}
      </div>

      <div className="mx-1 ms-3">
        <Row className="position-relative">
          <Col xs={12} className="pt-2">
            <div className="position-absolute" style={{ top: "-100px" }}>
              <Image
                src={avatar}
                onClick={onPickImage}
                className={`border border-white border-3 rounded-circle ${
                  canEdit ? "cursor-pointer" : ""
                }`}
                style={{ width: "130px", height: "130px", objectFit: "cover" }}
                alt={fullName}
                aria-disabled={!canEdit}
              />
              <input
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={!canEdit}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="mt-5 mt-md-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h3 className="h3 fw-bold mb-0">
                  {fullName} <MdOutlineVerifiedUser />
                </h3>
                <p className="mt-1">{title}</p>
                <p className="mt-1">
                  {area}{" "}
                  {view?.email && (
                    <a
                      href={`mailto:${view.email}`}
                      className="text-decoration-none"
                    >
                      Informazioni di contatto
                    </a>
                  )}
                </p>
                <p className="mt-1">
                  <a href="#" className="text-decoration-none text-primary">
                    6 collegamenti
                  </a>
                </p>

                {uploadError && (
                  <Alert variant="danger" className="py-2 my-2">
                    {uploadError}
                  </Alert>
                )}
              </div>

              {canEdit && (
                <span
                  className="text-secondary cursor-pointer me-4"
                  onClick={onPickImage}
                >
                  <ImPencil />
                </span>
              )}
            </div>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Button
              variant="primary"
              className="rounded-pill me-2 mt-1 mb-3 fw-bold"
            >
              Disponibile per
            </Button>
            <Button
              variant="outline-primary"
              className="rounded-pill me-2 mt-1 mb-3  fw-bold"
            >
              Aggiungi sezione del profilo
            </Button>
            <Button
              variant="outline-primary"
              className="rounded-pill me-2  mt-1 mb-3 fw-bold"
            >
              Migliora profilo
            </Button>
            <Button
              variant="outline-secondary"
              className="rounded-pill mt-1 mb-3  fw-bold text-dark border-dark"
            >
              Risorse
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Hero;
