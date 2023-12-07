
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import First from './first/First';
import Edit from './Edit/Edit';

function App() {

 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={First}/>
        <Route path='/edit' Component={Edit}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
