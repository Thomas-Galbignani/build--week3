import GetYourId from "../functions/GetYourId";
import ModalFormExperiences from "./ModalFormExperiences";

const ExperienceItem = ({ role, org, period, place, mode, bullets }) => (
    <div className="d-flex gap-3 py-3 border-bottom">
        <div className="rounded bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
            {org[0]}
        </div>
        <div>
            <div className="fw-semibold">{role}</div>
            <div className="small text-muted">
                {org} · {period}
            </div>
            <div className="small text-muted">
                {place} · {mode}
            </div>
            <ul className="small mt-2 mb-0 ps-3">
                {bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                ))}
            </ul>
        </div>
    </div>
);

const API_URL = "https://striveschool-api.herokuapp.com/api/profile/";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI2Yjk5MDE2MjdjNjAwMTVmOGM1ODEiLCJpYXQiOjE3NTY4MDU1MjAsImV4cCI6MTc1ODAxNTEyMH0.CSCymkjF77OkWMKrXDgQ7Gsm-g6OZLgXMmeqIc6UgwA";

export default function Experience() {
    const MyId = GetYourId();
    console.log(MyId);

    return (
        <div className="border-bottom">
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <span className="fw-semibold">Esperienze</span>
                <div className="d-flex gap-2">
                    <ModalFormExperiences />
                </div>
            </div>

            <div className="p-0">
                <ExperienceItem
                    role="Junior ICT Consultant"
                    org="ISA Digital Consulting"
                    period="nov 2022 – dic 2024 · 2 anni 2 mesi"
                    place="Roma, Lazio, Italia"
                    mode="Da remoto"
                    bullets={["Supporto agli utenti di enti locali per problematiche nell’utilizzo di applicativi.", "Stesura di manuali per l’utilizzo di applicativi."]}
                />
                <ExperienceItem
                    role="Assistente archivista"
                    org="Comune di Oristano"
                    period="ott 2021 – giu 2022 · 9 mesi"
                    place="Oristano, Sardegna, Italia"
                    mode="In sede"
                    bullets={["Protocollo digitale e fisico tramite applicativo Smart*Desktop Finmatica.", "Apprendimento del metodo di conservazione documentale."]}
                />
                <ExperienceItem
                    role="Assistente archivista"
                    org="Comune di Oristano · Stage"
                    period="ott 2018 – dic 2018 · 3 mesi"
                    place="Oristano, Sardegna, Italia"
                    mode="In sede"
                    bullets={["Data entry"]}
                />
            </div>
        </div>
    );
}
