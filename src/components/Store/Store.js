import React, { useState, useEffect } from 'react';
import { Container, Card, Accordion, Navbar, NavDropdown, Nav, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemCard from '../ItemCards/ItemCard';
import Navigationbar from '../Navbar/Navigationbar';
import { cartListChange } from '../../redux/reducer/cart-reducer';
import { useSelector } from 'react-redux';
import { itemListChange } from '../../redux/reducer/item-reducer';

const Store = (props) => {

   const products = useSelector(state => state.items.itemlist);

   const [search, setSearch] = useState("");
   const [filteredProduct, setFilteredProduct] = useState([])

   const [cartNotification, setCartNotification] = useState({
      errornotif: false,
      successnotif: false
   });

   const {
      searchProductHandler,
      deleteItem,
      AddItemtoCart
   } = props

   useEffect(() => {
      setFilteredProduct(products)
   }, [products])

   useEffect(() => {
      const filteredItems = products.filter(
         (item) => item.ItemName.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredProduct(filteredItems)

   }, [search]);

   return (
      <div>
         <Navigationbar />
         <div className="container is-max-widescreen">
            <h1 className="has-text-weight-bold is-size-5 animate__animated animate__fadeInDown">Search Products</h1>
            <Row>
               <Col xs={2} md={12} className="itemList">
                  {
                     cartNotification.errornotif ?
                        <div class="notification is-danger is-light mt-2 animate__animated animate__fadeInDown">
                           Product is already on cart.
                        </div>
                        : null
                  }
                  {
                     cartNotification.successnotif ?
                        <div class="notification is-success is-light mt-2 animate__animated animate__fadeInDown">
                           Successfully Added to cart.
                        </div>
                        : null
                  }
                  <Row xs={1} md={5} className="g-4 p-2" >
                     <input className="input animate__animated animate__fadeInDown" type="text" placeholder="Search Hardware Products..." onChange={(e) => { setSearch(e.target.value) }} />
                     {
                        filteredProduct.length > 0 ?
                           filteredProduct.map((item, index) => {
                              return (
                                 item.ItemCount > 0 ?
                                    <ItemCard item={item} key={index} setCartNotification={setCartNotification} />
                                 : null
                              )
                           })
                        : null
                     }
                  </Row>
               </Col>
            </Row>
         </div>

      </div>
   )
}

export default Store
