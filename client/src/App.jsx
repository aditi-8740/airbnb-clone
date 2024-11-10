import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import IndexPage from './Pages/IndexPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import AppLayout from './Components/AppLayout.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';
import AccountPage from './Pages/AccountPage.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import BookingsPage from './Pages/UserBookingsPage.jsx';
import UserPlacesPage from './Pages/UserPlacesPage.jsx';
import PlacesForm from './Components/PlacesForm.jsx';
import PlacePage from './Pages/PlacePage.jsx';
import EachBookingPage from './Pages/EachBookingPage.jsx';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const router = createBrowserRouter([    //returns a router object, which defines all the routes for your app.
    {
      // when the URL matches this segment
      path: "/",

      // it renders this element
      element: <AppLayout/>,
      children:[
        {
          path: "/",
          element: <IndexPage/>
        },
        {
          path: "/login",
          element: <LoginPage/>
        },
        {
          path: "/register",
          element: <RegisterPage/>
        },
        {
          path: "/account",
          element: <AccountPage/>,
          children:[
            {
              path: "myprofile",
              element: <ProfilePage/>
            },
            {
              path: "bookings",
              element: <BookingsPage/>,
            },
            {
              path: "bookings/:id",
              element: <EachBookingPage />
            },
            {
              path: "places",
              element: <UserPlacesPage/>,
            },
            {
              path:'places/add',
              element: <PlacesForm />
            },
            {
              path:'places/:id',
              element: <PlacesForm />
            }
          ]
        },
        {
          path: '/places/:id',
          element: <PlacePage />
        }
    
      ]
    }]);

  return (
    <UserContextProvider>
    <RouterProvider router={router} />  
    </UserContextProvider>
  );    // component that connects your router object (created with createBrowserRouter) to your app. It enables routing throughout your app. Without it, React Router wouldn’t know how to match the URLs with the correct components.
}

export default App;
