import { Routes, Route, Link } from 'react-router-dom';
import Local from './Local';
import Online from './Online';

const App = () => {

  return (
    <>    
    <ul>
    <li>
      <Link to="/"><button>Back</button></Link>
    </li>
    <li>
      <Link to="/local">Local</Link>
    </li>
    <li>
      <Link to="/online">Online</Link>
    </li>
  </ul>
    <Routes>
      <Route path='/local' element={<Local/>}></Route>
      <Route path='/online' element={<Online/>}></Route>
    </Routes>
    </>
  );
}

export default App;