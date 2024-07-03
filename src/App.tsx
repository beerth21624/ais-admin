import {useEffect,useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from './components/common/NavBar';
import SideNav from './components/common/SideNav';
import PrivateRoute from './components/auth/PrivateRoute';
import ManageCharacter from './screens/manageCharacter/ManageCharacterView';
import CharacterDetailPage from './screens/manageCharacter/CharacterDetailPage';
import ManageKnowledgeView from './screens/manageKnowledge/ManageKnowledgeView';
import TrainingPage from './screens/manageKnowledge/TrainingPage';
import LoginPage from './screens/login/LoginPage';
import CallCenterPage from './screens/callCenter/CallCenterPage';
import CustomerFullProfilePage from './screens/callCenter/CutomerFullProfilePage';
import CallCenterViewPage from './screens/callCenter/CallCenterViewPage';
import NewsPage from './screens/news/NewsPage';
import NewProblemPage from './screens/newProblem/NewProblemPage';
import DashboardPage from './screens/dashboard/DashboardPage';
import Notfound from './components/common/Notfound';
import Alert from './components/common/Alert';
import { AlertProvider } from './contexts/AlertContext';
import TestChat from './screens/testChat/TestChat';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token ]);


  return (
    <BrowserRouter>
    <AlertProvider>
      <div className="flex">
        {isAuthenticated && (
          <div style={{ minHeight: "100vh" }}>
            <SideNav />
          </div>
        )}
        <div className="flex flex-col w-full">
          {isAuthenticated && <NavBar />}
          <div className={`${isAuthenticated? 'p-5': ''}`} >
            <div
              className={`${isAuthenticated ? "bg-white w-full h-full rounded-md shadow-md p-5":'' }`}
              style={{
                minHeight: isAuthenticated ? "calc(100vh - 4rem - 3rem)" : ""
               }}
            >
              <Routes>
                <Route path="/login" element={
                  isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
                } />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/manage-character" element={<ManageCharacter />} />
                  <Route path="/character-detail/:id" element={<CharacterDetailPage />} />
                  <Route path="/manage-knowledge" element={<ManageKnowledgeView />} />
                  <Route path="/training/:id" element={<TrainingPage />} />
                  <Route path="/call-center-detail" element={<CallCenterPage />} />
                  <Route path="/customer-full-profile" element={<CustomerFullProfilePage />} />
                  <Route path="/call-center" element={<CallCenterViewPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/problem" element={<NewProblemPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/test-chat" element={<TestChat />} />
                </Route>
                <Route path="*" element={<Notfound />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <Alert />
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;