import {React,useState,useEffect} from 'react'
import "./Nav.css"
import cinelfix from "./cineflix.png"
import {useSelector} from "react-redux"
import { selectUser } from './features/counter/userSlice'
import { useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core'
function Nav() {

    const [show,handleshow] = useState(false);
    const history = useHistory();
    const user = useSelector(selectUser);
    const transitionNavBar = () => {
        if(window.scrollY > 100){
            handleshow(true)
        }
        else{
            handleshow(false)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll",transitionNavBar)
        return () => {
            window.removeEventListener("scroll" ,transitionNavBar)
        }
    }, [])
    return (
    <div className = {`nav  ${show&&'nav__black'}`}>
            <div className = "nav__contents">
            
            <img  className = "nav__logo"   onClick ={() => history.push("/")} src = {cinelfix} alt = "no"/>
             <div className = "nav__avatar">
              <Avatar   onClick ={() => history.push("/profile")}
              src = {user.photoUrl} alt = ""/> 
            
             </div>
            </div>

            
            
        </div>
    )
}

export default Nav