import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from "./Components/Pages/Dashboard"
import Account from "./Components/Pages/Account"
import Booking from "./Components/Pages/Booking"
import Cabins from "./Components/Pages/Cabins"
import Login from "./Components/Pages/Login"
import Setting from "./Components/Pages/Setting"
import User from "./Components/Pages/User"
import { Toaster } from "react-hot-toast"
import PageNotFound from "./Components/Pages/PageNotFound"
import AppLayout from './Components/ui/AppLayout';
import GlobalStyle from './Components/Styles/GlobalStyle';


const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})

const App = () => {
  return (

    <QueryClientProvider client={queryclient}>
      <Toaster position="top-center" />
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path='Dashboard' element={<Dashboard />} />
            <Route path='Account' element={<Account />} />
            <Route path='Booking' element={<Booking />} />
            <Route path='Cabins' element={<Cabins />} />
            <Route path='Setting' element={<Setting />} />
            <Route path='User' element={<User />} />
          </Route>
          <Route path='Login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
