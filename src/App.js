import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import TimeSheet from './Pages/TimeSheet';
import TimeTracker from './Pages/TimeTracker';
import Calendar from './Pages/Calendar';
import Footer from './Components/Footer';
import Team from './Pages/Team';
import AddEmployee from './Pages/AddEmployee'
import Testlogin from './Pages/testlogin';
import LoginCom from './Components/LoginCom';
import ManualTimeSheet from './Pages/Manual-Time-Sheet';








function App() {
  return (
    <>
      
      <BrowserRouter>
       
        <div className="content">
          <Routes>
          <Route path = "/" exact element={<LoginCom />} />
            <Route path='/TimeSheet' exact element={<TimeSheet />} />
            <Route path='/TimeTracker' exact element={<TimeTracker />} />
            <Route path='/Calendar' exact element={<Calendar />} />
            <Route path='/Team' exact element={<Team />} />
            <Route path="/addEmployee" exact element={<AddEmployee />} />
            <Route path = "/login" exact element={<Testlogin />} />
            <Route path = "/ManualTimeSheet" exact element={<ManualTimeSheet />} />
           </Routes>
         
        </div>
      </BrowserRouter>
      <Footer />
    </>
    
  );
}


export default App;
