import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { validateChange, userEmailChange, userUserNameChange } from './redux/reducer/user-reducer';
import { itemListChange } from './redux/reducer/item-reducer';
import { Switch, Route, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import withLoading from './HOC/withLoading';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import 'animate.css';
import './App.css';

import Login from './components/Login'
import Homepage from './components/Homepage/Homepage'
import Cart from './components/Cart/Cart'
import Log from './components/Log/Log'
import Store from './components/Store/Store';
import ItemCard from './components/ItemCards/ItemCard';
import AddItemCard from './components/ItemCards/AddItemCard';
import CreateUser from './components/CreateUser/CreateUser';
import TestLogin from './components/TestLogin/TestLogin';

import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';

function App() {

  const history = useHistory();
  const dispatch = useDispatch()
  const products = useSelector(state => state.items.itemlist);
  const [displayList, setDisplayList] = useState([]);

  const item = [
    {
      ItemId: uuidv4(),
      ItemName: 'Nail',
      ItemPrice: 30,
      ItemCount: 0,
      ItemDescription: 'nails have a sharp point on one end and a flattened head on the other, but headless nails ',
      ItemPicture: 'https://www.concrete-nails.com/img/black-concrete-nails-plain.jpg'
    },
    {
      ItemId: uuidv4(),
      ItemName: 'Lock',
      ItemPrice: 50,
      ItemCount: 3,
      ItemDescription: 'a lock which is used for fastening two things together',
      ItemPicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2q7mVWMGlXpu02WiOSjmniufRR1am9W_Nw&usqp=CAU'
    },
    {
      ItemId: uuidv4(),
      ItemName: 'Hammer',
      ItemPrice: 500,
      ItemCount: 20,
      ItemDescription: 'a hand tool, consisting of a weighted "head" fixed to a long handle that is swung to deliver an impact to a small area of an object.',
      ItemPicture: 'https://media.istockphoto.com/photos/hammer-picture-id183759696?k=20&m=183759696&s=612x612&w=0&h=DRDKhrKEkSMcwMyYN_CnXpC9rhpr6ijtySRDw2Nedxw='
    },
    {
      ItemId: uuidv4(),
      ItemName: 'Knife',
      ItemPrice: 100,
      ItemCount: 12,
      ItemDescription: 'A utensil that has a handle and a blade that may or may not be sharp-edged',
      ItemPicture: 'https://m.media-amazon.com/images/I/31yRLZXQbrL._AC_SY1000_.jpg'
    },
    {
      ItemId: uuidv4(),
      ItemName: 'Hand saw',
      ItemPrice: 2500,
      ItemCount: 25,
      ItemDescription: 'Handsaws have been around for thousands of years. Egyptian hieroglyphics exist depicting ancient woodworkers sawing boards into pieces. Ancient bow saws have been found in Japan',
      ItemPicture: 'http://i.ebayimg.com/images/g/Tc0AAOSwJt5f3adh/s-l500.jpg'
    },
    {
      ItemId: uuidv4(),
      ItemName: 'Screw',
      ItemPrice: 345,
      ItemCount: 2,
      ItemDescription: 'A screwdriver is a tool, manual or powered, used for driving screws. A typical simple screwdriver has a handle and a shaft, ending in a tip the user puts into the screw head before turning the handle.',
      ItemPicture: 'https://cdn.shopify.com/s/files/1/0249/1441/products/DSC04965_600x600.jpg?v=1585149406'
    }
  ]

  useEffect(() => {
    dispatch(itemListChange(item))
    setDisplayList(displayList)
  }, [])

  const users = [
    {
      id: 1,
      email: 'pat@gmail.com',
      password: 123
    }
  ]

  const [idCount, setIdCount] = useState()

  const [usersApi, setUsersApi] = useState([])

  const [searchProduct, setSearchProduct] = useState("")

  const [itemList, setItemList] = useState({
    itemlist: item
  })

  const [itemdetails, setItemdetails] = useState({
    itemname: '',
    itemprice: 0,
    itemquantity: 0,
    itemdescription: '',
    itemimage: ''
  })

  const [cartList, setCartList] = useState({
    cartlist: []
  })

  const [logList, setLogList] = useState({
    loglist: []
  })

  const [notif, setNotif] = useState({
    notification: false
  })

  const [auth, setAuth] = useState({
    authenticated: false
  })

  const [account, setAccount] = useState({
    useremail: '',
    username: ''
  })

  const [loginValidation, setLoginValidation] = useState({
    message: ''
  })



  const setItemname = (e) => {
    setItemdetails({ ...itemdetails, itemname: e.target.value })
  }

  const setItemprice = (e) => {
    setItemdetails({ ...itemdetails, itemprice: e.target.value })
  }

  const setItemquantity = (e) => {
    setItemdetails({ ...itemdetails, itemquantity: e.target.value })
  }

  const setItemdescription = (e) => {
    setItemdetails({ ...itemdetails, itemdescription: e.target.value })
  }

  const setItemimage = (e) => {
    setItemdetails({ ...itemdetails, itemimage: e.target.value })
  }

  const setEmail = (e) => {
    setAccount({ ...account, useremail: e.target.value })
  }

  const setUsername = (e) => {
    setAccount({ ...account, username: e.target.value })
  }

  const loginAction = (e) => {

    const emailValidation = useremail.includes("@") && useremail.includes(".");
    const emailAuthentication = usersApi.find(item => item.email === useremail);
    const userNameAuthentication = usersApi.find(item => item.username === username);


    if (!emailValidation) {
      notificationMessage = "Email Incorrect Format";
      setLoginValidation({ message: notificationMessage })
      setNotif({ ...notif, notification: true })

      setInterval(() => {
        setNotif({ ...notif, notification: false })
        setLoginValidation({ message: '' })
      }, 3000)
    }


    if (!useremail && !username || useremail && !username || !useremail && username) {
      notificationMessage = "Make sure to fill all fields";
      setLoginValidation({ message: notificationMessage })
      setNotif({ ...notif, notification: true })

      setInterval(() => {
        setNotif({ ...notif, notification: false })
        setLoginValidation({ message: '' })
      }, 3000)
    }

    if (useremail != '' && username != '') {
      if (emailAuthentication) {
        const data = emailAuthentication?.username;
        if (data === username) {
          dispatch(validateChange(true))
          dispatch(userEmailChange(useremail))
          dispatch(userUserNameChange(username))
          setAuth({ ...auth, authenticated: true })

          setAccount({ 
            ...account, 
            useremail: '',
            username: ''
          })
          
          history.push('/homepage')
        }
        else {
          setInterval(() => {
            setNotif({ ...notif, notification: false })
            setLoginValidation({ message: '' })
          }, 3000)
        }
      }
    }

    if (!userNameAuthentication) {
      notificationMessage = "Wrong Username Credential";
      setLoginValidation({ message: notificationMessage })
      setNotif({ ...notif, notification: true })

      setInterval(() => {
        setNotif({ ...notif, notification: false })
        setLoginValidation({ message: '' })
      }, 3000)
    }

    if (!userNameAuthentication && !emailAuthentication) {
      notificationMessage = "Wrong Credential";
      setLoginValidation({ message: notificationMessage })
      setNotif({ ...notif, notification: true })

      setInterval(() => {
        setNotif({ ...notif, notification: false })
        setLoginValidation({ message: '' })
      }, 3000)
    }

    if (!emailAuthentication) {
      notificationMessage = "Wrong Email Credential";
      setLoginValidation({ message: notificationMessage })
      setNotif({ ...notif, notification: true })

      setInterval(() => {
        setNotif({ ...notif, notification: false })
        setLoginValidation({ message: '' })
      }, 3000)
    }

    if (!userNameAuthentication) {
      console.log("wrong Credential")
    } else { console.log("right username") }

    //for (let i = 0; i < users.length; i++) {
    //  if (users[i].email == useremail && users[i].password == password) {
    //    history.push('/homepage')
    //    setAuth({ ...auth, authenticated: true })
    //    break;
    //  } else {
    //    setNotif({ ...notif, notification: true })
    //    setAccount({ ...account, useremail: '', password: '' })
    //
    //    setInterval(() => {
    //      setNotif({ ...notif, notification: false })
    //       
    //    }, 3000)
    //    
    //  }
    //}
  }

  const logoutAction = () => {
    //dispatch(validateChange(false))
    localStorage.removeItem('token')

    history.push('/')
  }

  const { message } = loginValidation;
  const { loglist } = logList;
  const { cartlist } = cartList;
  const { itemlist } = itemList;
  const { useremail, username } = account;
  const { authenticated } = auth;
  const { notification } = notif;

  const searchProductHandler = (e) => {
    setSearchProduct(e.target.value)
  }

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsersApi(response.data);
      })
  }, []);


  useEffect(() => {

    const list = itemlist;
    const filteredItems = list.filter(
      (item) => item.ItemName.toLowerCase().includes(searchProduct.toLowerCase())
    )

    setItemList({ itemlist: filteredItems })

    if (!searchProduct) {
      setItemList({ itemlist: item })
    }

  }, [searchProduct]);

  let notificationMessage;
  let productNotificationMessage;
  const inputEmail = useSelector(state => state.account.email);
  const inputUsername = useSelector(state => state.account.username);
  const validation = useSelector(state => state.account.validate);

  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login
            notification={notification}
            loginAction={loginAction}
            setEmail={setEmail}
            setUsername={setUsername}
            useremail={useremail}
            username={username}
            message={message} />
        </Route>
        <Route path="/homepage">
          <Homepage
            item={itemlist}
            itemdetails={itemdetails}
            searchProductHandler={searchProductHandler}
            authenticated={authenticated}
            setAuth={setAuth}
            logoutAction={logoutAction} />
        </Route>
        <Route path="/cart">
          <Cart cartlist={cartlist} cartList={cartList} setCartList={setCartList} />
        </Route>
        <Route path="/log">
          <Log loglist={loglist} />
        </Route>
        <Route exact path="/">
          <Store
            item={itemlist}
            displayList={displayList}
            setDisplayList={setDisplayList}
            searchProductHandler={searchProductHandler}
          />
        </Route>
      </Switch>

    </div>
  );
}

export default withLoading(App);