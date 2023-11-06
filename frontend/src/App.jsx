import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import ProductoInformacion from './pages/ProductoInformacion';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import {DataProvider} from './context/DataProvider';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Home/>} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='mas-informacion/:modelo' element={<ProductoInformacion/>} />
          </Route>
        </Routes>
      </DataProvider>
    </BrowserRouter>
  )
}

export default App;
