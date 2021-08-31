import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Home from './components/home';
import Header from './components/header';
import Footer from './components/footer';
import Createpost from './components/createpost';
import Register from './components/register';
import Expandedpost from './components/expandedpost';
import Searchposts from './components/searchposts';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import UserContext from './store/usercontext.js';
import {useContext,useState,useEffect} from 'react';

function App() {
  const currentUser=useContext(UserContext);
  const { isLoggedin,getLoggedin,Loggedinuser,getLoggedinUser}=currentUser;
  getLoggedin();
  
  console.log(isLoggedin);
  return (
    <Router>
    <div className="App">
    <Header/>
    <Route exact path='/' component={isLoggedin?Home:Login}></Route>
    <Route exact path='/createpost' component={isLoggedin?Createpost:Login}></Route>
    <Route exact path='/login' component={isLoggedin?Home:Login}></Route>
    <Route exact path='/register' component={isLoggedin?Home:Register}></Route>
    <Route exact path='/showpost/:id' component={isLoggedin?Expandedpost:Register}></Route>
    <Route exact path='/searchposts/:title' component={Searchposts}></Route>
     </div>
    {!isLoggedin && <Footer/>}
    </Router>
  );
}

export default App;
