import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from '@/layout';
import Main from '@/pages/main/Main';
import Map from '@/pages/map/MapPage';
import Performance from '@/pages/performance/Performance';
import Booth from '@/pages/booth/Booth';
import Polaroid from '@/pages/polaroid/Polaroid';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/main/*" element={<Main />} />
          <Route path="/map/*" element={<Map />} />
          <Route path="/performance/*" element={<Performance />} />
          <Route path="/booth/*" element={<Booth />} />
          <Route path="/polaroid" element={<Polaroid />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
