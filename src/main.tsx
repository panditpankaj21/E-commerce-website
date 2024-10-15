import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FilterProvider } from './components/FilterContext.tsx'
import { Provider } from 'react-redux';
import { store } from "./redux/store.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilterProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </FilterProvider>
  </StrictMode>,
)
