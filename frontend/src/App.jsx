import { Routes, Route } from 'react-router-dom';

import {Layout} from './components/Layout';
import {LoginPage} from './pages/LoginPage';
import {SignupPage} from './pages/SignupPage';
import {ProjectsPage} from './pages/ProjectsPage';
import {ProjectDetailsPage} from './pages/ProjectDetailsPage';
import {NotFoundPage} from './pages/NotFoundPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
