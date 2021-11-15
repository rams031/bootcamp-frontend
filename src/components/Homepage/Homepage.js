import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from '../Navbar/Navigationbar';
import styles from './Homepage.module.css';
import AddItemCard from '../ItemCards/AddItemCard';
import ItemCard from '../ItemCards/ItemCard';
import userRestriction from "../../HOC/userRestriction";
import { itemListChange } from '../../redux/reducer/item-reducer';
import { logListChange } from '../../redux/reducer/log-reducer';
import { useSelector } from 'react-redux';


const Homepage = (props) => {

  const {
    deleteItem,
    AddItemtoCart,
    productNotification,
    productValidationMessage,
    itemdetails,
    setItemname,
    setItemprice,
    setItemquantity,
    setItemdescription,
    setItemimage,
    searchProductHandler,
    authenticated,
    setAuth,
    logoutAction } = props

  const itemfordisplay = useSelector(state => state.items.itemlist)
  const [filteredProduct, setFilteredProduct] = useState([])
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilteredProduct(itemfordisplay)
  }, [itemfordisplay])

  useEffect(() => {
    const filteredItems = itemfordisplay.filter(
      (item) => item.ItemName.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredProduct(filteredItems)
  }, [search]);

  return (
    <div className={styles.homepage}>
      <Navigationbar authenticated={authenticated} setAuth={setAuth} logoutAction={logoutAction} />
      <div className="container is-max-widescreen">
        <h1 className="has-text-weight-bold is-size-3 animate__animated animate__fadeInDown">Products</h1>
        <Row>

          <Col xs={5} md={8} className="itemList">
            <Row xs={1} md={3} className="g-4 p-2" >
              <input className="input animate__animated animate__fadeInDown" type="text" placeholder="Search Product" onChange={(e) => setSearch(e.target.value)} />
              {
                filteredProduct.length > 0 ?
                  filteredProduct.map((item, index) => {
                    return (
                      <ItemCard item={item} key={index} indexitem={index} deleteItem={deleteItem} AddItemtoCart={AddItemtoCart} />
                    )
                  }) : null
              }
            </Row>
          </Col>
          <Col xs={6} md={4}>
            <AddItemCard
              productNotification={productNotification}
              productValidationMessage={productValidationMessage}
              itemdetails={itemdetails}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Homepage //userRestriction(Homepage)
