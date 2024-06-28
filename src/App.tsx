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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token ]);


  return (
    <BrowserRouter>
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
                  <Route path="/" element={<ManageCharacter />} />
                  <Route path="/character-detail/:id" element={<CharacterDetailPage />} />
                  <Route path="/manage-knowledge" element={<ManageKnowledgeView />} />
                  <Route path="/training/:id" element={<TrainingPage />} />
                </Route>
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;