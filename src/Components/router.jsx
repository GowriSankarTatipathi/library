// // File: frontend/router.jsx
// import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
// import Home from './Pages/Home/Home';
// import Books from "./Pages/Browsebook/Books";
// import AddBooks from "./Pages/Addbooks/AddBooks";
// import BookDetail from "./Pages/Bookdetail/BookDetail";
// import Error from "./Pages/Error/Error";
// import BookPage from "./Components/BookPage";
// import Login from "./Pages/auth/Login";
// import Signup from "./Pages/auth/Signup";
// import ProtectedRoute from "./Components/ProtectedRoute";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       { path: '', element: <Home /> },

//       // ✅ Keep BookPage public so category param works
//       { path: 'books/:category', element: <BookPage /> },

//       {
//         element: <ProtectedRoute />,
//         children: [
//           { path: 'browsebook', element: <Books /> },
//           { path: 'addbooks', element: <AddBooks /> },
//           { path: 'book/:id', element: <BookDetail /> },
//         ]
//       }
//     ]
//   },

//   // Auth routes
//   { path: '/auth/login', element: <Login /> },
//   { path: '/auth/signup', element: <Signup /> }
// ]);

// export default router;
