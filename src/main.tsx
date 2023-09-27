import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// * Toastify
import 'react-toastify/ReactToastify.css'

// Store and Provider
import { ToastContainer } from 'react-toastify'
import { store } from './Store.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-center" />
  </Provider>
)
