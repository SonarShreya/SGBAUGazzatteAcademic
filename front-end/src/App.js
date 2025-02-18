

import './components/HomePage.css'; 
import HomePage from './components/HomePage'; 
import UpdateCircular from "./components/UpdateCircular";
import UpdateNotification from "./components/UpdateNotification";
import UpdateGazette from './components/UpdateGazette';
import UpdateOrdinance from "./components/UpdateOrdinance"; 
import UpdateStatute from './components/UpdateStatute'; 
import UpdateRegulation from "./components/UpdateRegulation";
import UpdateDirection from './components/UpdateDirection';
import Nav from './components/Nav';
import './App.css';
import Logout from './components/Logout';
import AddGazetteForm from './components/AddGazetteForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import DisplayData from './components/DisplayData';
import PrivateComponents from './components/PrivateComponents';
import Login from "./components/Login";
import AddProduct from './components/AddProduct';
import ProductList from "./components/ProductList";
import UpdateProduct from './components/UpdateProduct';
import Regulation from './components/Regulation';
import Direction from  "./components/Direction"
import OrdinanceTable from './components/Ordinance';
import Statute from './components/Statute'; 
import Notification from './components/Notification';
import GovtGazette from './components/GovtGazette';
import GovtGazetteII from './components/GovtGazetteII';
import Circular from './components/Circular';
import SearchComponent from './components/SearchComponent'
import RegulationFroms from './components/RegulationFroms';
import Successpage from "./components/Successpage"
import Ordinance from "./components/Ordinance"
import AddDirection from './components/AddDirection';
import GovtGazetteForm2 from './components/GovtGazetteForm2';
import UpdateGazetteII from './components/UpdateGazetteII'; // Import the update form component

import jsPDF from 'jspdf';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* Define the private components route */}
          <Route element={<PrivateComponents />}>
            {/* Private Routes */}
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/regulation" element={<Regulation />} />
          </Route>

          {/* Public routes */}
          {/* <Route path="/logout" element={<Logout />} /> */}

          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/displaydata" element={<DisplayData />} />
          <Route path="/regulation" element={<Regulation />} />
          <Route path="/direction" element={<Direction />} />
          <Route path="/add-direction" element={<AddDirection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/OrdinanceTable" element={<OrdinanceTable />} />
          <Route path="/statute" element={<Statute />} />
          <Route path="/govtGazette" element={<GovtGazette />} />
          <Route path="/govtGazetteII" element={<GovtGazetteII />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/circular" element={<Circular />} />
          <Route path="/RegulationForms" element={<RegulationFroms />} />
          <Route path="/success" element={<Successpage />} />
          <Route path="/add-gazette" element={<AddGazetteForm />} />
          <Route path="/ordinance/:id" element={<UpdateOrdinance />} />
          <Route path="/regulation/edit/:id" element={<UpdateRegulation />} />
          <Route path="/statute/:id" element={<UpdateStatute />} />
          <Route path="/govt-gazette/:id" element={<UpdateGazette />} />
          <Route path="/notification/update/:id" element={<UpdateNotification />} />
          <Route path="/circular/update/:id" element={<UpdateCircular />} />
          <Route path="/govtGazetteForm2" element={<GovtGazetteForm2 />} />
          <Route path="/ordinance" element={<Ordinance />} />
          <Route path="/updatedirection/:id" element={<UpdateDirection />} />
          <Route path="/update-gazette/:id" element={<UpdateGazette />} />
          <Route path="/govt-gazette2" element={<GovtGazetteII />} />
        <Route path="/govt-gazette2/:id" element={<UpdateGazetteII />} /> {/* Dynamic route for update form */}
        <Route path="/govt-gazette2" element={<GovtGazetteII />} />
        <Route path="/govt-gazette2/add" element={<GovtGazetteII />}/>
        {/* <Route path="/govt-gazette2/add" element={<AddGovtGazetteForm />} /> */}
        <Route path="/govt-gazette2/add" element={<AddGazetteForm />} />
        <Route path="/govtGazette" element={<GovtGazette />} />
        <Route path="/AddGazetteForm" element={<AddGazetteForm />} />
        <Route path="/govt-gazette" element={<GovtGazette />} />
  <Route path="/AddGazetteForm" element={<AddGazetteForm />} />
  <Route path="/govt-gazette/:id" element={<UpdateGazetteII />} />

      

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


