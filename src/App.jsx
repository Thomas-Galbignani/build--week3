import Activity from './assets/components/Activity.jsx'
import Experience from './assets/components/Experience.jsx'
import Education from './assets/components/Education.jsx'
import Certifications from './assets/components/Certifications.jsx'
import Skills from './assets/components/Skills.jsx'
import Languages from './assets/components/Languages.jsx'
import Interests from './assets/components/Interests.jsx'

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="bg-white shadow rounded p-4">
          <div className="mb-5"><Activity /></div>
          <div className="mb-5"><Experience /></div>
          <div className="mb-5"><Education /></div>
          <div className="mb-5"><Certifications /></div>
          <div className="mb-5"><Skills /></div>
          <div className="mb-5"><Languages /></div>
          <div className="mb-5"><Interests /></div>
        </div>
      </div>
    </div>
  );
}
