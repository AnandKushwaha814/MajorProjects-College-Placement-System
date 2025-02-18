// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState, useEffect } from "react"
// import { onAuthStateChanged, signOut } from "firebase/auth"
// import { useFirebase } from "./context/authContext"
// import "bootstrap/dist/css/bootstrap.min.css"
// // import Logo from "./components/Logo";
// import Header from "./components/Header";
// import Cards from "./components/Cards";
// import Jobs from "./pages/Jobs";
// import Students from "./pages/Students";
// import Upcoming from "./pages/Upcoming";
// import TrackApplication from "./pages/TracStatus";
// import Footer from "./components/Footer";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp"
// import UserDetails from "./components/UserDetails"
// import PlacedData from './components/PlacedData'


// function App() {
//   const firebase = useFirebase();
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     onAuthStateChanged(firebase, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     })
//   }, [firebase])
//   if (user === null) {
//     return (
//       <Router>
//         <div>
//           {/* <Logo /> */}
//           <Header />
//           <Routes>
//             <Route path="/" element={<Cards />} />
//             <Route path="/jobs" element={<Jobs />} />
//             <Route path="/students" element={<Students />} />
//             <Route path="/drives" element={<Upcoming />} />
//             <Route path="/track" element={<TrackApplication />} />
//             <Route path="/Login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/user/:id" element={<UserDetails />} />
//             <Route path="/placed/:student_id" element={<PlacedData />} />
//           </Routes>
//         </div>
//         <Footer />
//       </Router>
//     )
//   }
//   return (
//     <Router>
//       <div>
//         {/* <Logo /> */}
//         <Header />
//         <Routes>
//           <Route path="/" element={<Cards />} />
//           <Route path="/jobs" element={<Jobs />} />
//           <Route path="/students" element={<Students />} />
//           <Route path="/drives" element={<Upcoming />} />
//           <Route path="/track" element={<TrackApplication />} />
//           {/* <Route path="/Login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} /> */}
//           <Route path="/user/:id" element={<UserDetails />} />
//           <Route path="/placed/:student_id" element={<PlacedData />} />
//           <button onClick={() => signOut(firebase)}>Logout</button>
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Jobs from "./pages/Jobs";
import Students from "./pages/Students";
import Upcoming from "./pages/Upcoming";
import TrackApplication from "./pages/TracStatus"; // Fixed typo
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDetails from "./components/UserDetails";
import PlacedData from "./components/PlacedData";

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/students" element={<Students />} />
        <Route path="/drives" element={<Upcoming />} />
        <Route path="/track" element={<TrackApplication />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/placed/:student_id" element={<PlacedData />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
