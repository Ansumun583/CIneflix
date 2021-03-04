import React,{useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux"
import './App.css';
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import ProfileScreen from "./screens/ProfileScreen"
import {auth} from "./firebase"
import {logout,login, selectUser} from "./features/counter/userSlice"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  const user = useSelector(selectUser);
   const dispatch = useDispatch()

  useEffect(() => {
   const unsubsribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth)
      {
          dispatch(login({
            uid:userAuth.uid,
            email:userAuth.email,
            photoUrl : userAuth.photoURL
          })) 
         
      }
      else{
       dispatch(logout());
      }

    })
    return unsubsribe
  }, [dispatch])
  return (
    <div className="app">
      
      <Router>
        {!user? (
          <LoginScreen/>
        ):(
           <Switch>
          <Route  exact path="/">
          <HomeScreen/>
          </Route>
          <Route path = "/profile">
             <ProfileScreen/>
             </Route>
        </Switch>
        )
        }
        
     
    </Router>
    </div>
  );
}

export default App;