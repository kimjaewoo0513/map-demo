import './App.css';
import Map from './components/Map';

import { NavermapsProvider } from 'react-naver-maps'

function App() {
  return (
    <>
      <NavermapsProvider ncpClientId={process.env.REACT_APP_MAP_CLIENT_ID} >
      
        <Map/>
        
      </NavermapsProvider>
    </>
  );
}

export default App;
