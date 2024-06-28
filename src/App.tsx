import NavBar from './components/NavBar';
import SideNav from './components/SideNav';
import ManageCharacter from './screens/manageCharacter/ManageCharacterView';
import CharacterDetailPage from './screens/manageCharacter/CharacterDetailPage';
import ManageKnowledgeView from './screens/manageKnowledge/ManageKnowledgeView';
import TrainingPage from './screens/manageKnowledge/TrainingPage';

//router
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {

  return (
    <>
      <div className="flex "

      >
  <div style={{
    minHeight: "100vh",
        }}>       <SideNav /></div>
 
        <div className="flex flex-col w-full">
          <NavBar />
          <div className="p-5">
            <div className=" bg-white w-full h-full  rounded-md shadow-md p-5"
            style={{
              minHeight: "calc(100vh - 4rem - 3rem)"
            
            }}
            >

        <BrowserRouter>
          <Routes>
                  <Route path="/" element={<ManageCharacter />} />
            <Route path='character-detail/:id' element={<CharacterDetailPage />} />
            <Route path="/manage-knowledge" element={<ManageKnowledgeView />} />
                  <Route path="/training/:id" element={<TrainingPage />} />

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
            </div>
         </div>
        </div>

      </div>

    </>
  )
}

export default App
