import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Error, Register, LandingPage, ProtectedRoute } from "./pages";
import {AllJobs, AddJob, SharedLayout, Profile, Stats} from './pages/dashboard'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <SharedLayout/>
            </ProtectedRoute>
            }>
              <Route index element={<Stats/>}/>
              <Route path='all jobs' element={<AllJobs/>}/>
              <Route path='add job' element={<AddJob/>}/>
              <Route path='profile' element={<Profile/>}/>
              <Route path='stats' element={<Stats/>}/>
              
            </Route>
            <Route path="/register" element={<Register/>}/>
            <Route path="/landing" element={<LandingPage/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
 