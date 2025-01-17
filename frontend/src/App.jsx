import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
import './index.css'

import Beatles from './components/Beatles';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Rakim from './components/Rakim';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/beatles" element={<Beatles />}></Route>
          <Route path="/rakim" element={<Rakim />}></Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;