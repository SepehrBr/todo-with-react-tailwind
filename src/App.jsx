import './App.css'
import Todos from './components/Todos'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="bg-gray-100">
        <ToastContainer />
        <Todos />
    </div>
  )
}

export default App
