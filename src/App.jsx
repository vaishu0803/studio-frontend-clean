// ✅ DO THIS IN App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import QuotationForm from './Components/QuotationForm';
import Gallery from './Components/Gallery';
import Aboutus from './Components/Aboutus';
import Services from './Components/Services';
import Contact from './Components/Contact';

function App() {
  return (
    
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/quotation" element={<QuotationForm />} />
      <Route path="/Gallery" element={<Gallery />} />
      <Route path="/about" element={<Aboutus/>} />
      <Route path="/Services" element={<Services/>} /> 
      <Route path="/Contact" element={<Contact/>} />
    </Routes> 
  );
}

export default App;
