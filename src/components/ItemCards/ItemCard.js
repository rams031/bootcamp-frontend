import React, { useState, useEffect } from 'react'
import { Container, Card, Accordion, Navbar, NavDropdown, Nav, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import styles from './ItemCard.module.css';
import { v4 as uuidv4 } from 'uuid';
import { itemListChange } from '../../redux/reducer/item-reducer';
import { logListChange } from '../../redux/reducer/log-reducer';
import { cartListChange } from '../../redux/reducer/cart-reducer';
import { useSelector, useDispatch } from 'react-redux';

const ItemCard = (props) => {


  
  const {
    item,
    key,
    indexitem
    //deleteItem, 
    //AddItemtoCart
  } = props;
  const { setCartNotification } = props
  const dispatch = useDispatch();

  const productstodisplay = useSelector(state => state.items.itemlist);
  const logs = useSelector(state => state.logs.loglist);
  const carttodisplay = useSelector(state => state.cart.cartlist);
  const validateUser = useSelector(state => state.account.validate);
  

  const [quantity, setQuantity] = useState(0)
  const [changeQuantity, setChangeQuantity] = useState(item.ItemCount)
  const [alert, setalert] = useState(false)
  const [productlist, setList] = useState([]);
  const backgroundColor = [];

  useEffect(() => {
    setList(productstodisplay)
  }, [])

  const AddItemtoCart = (carid, proid, cart, count, name, price, picture) => {

    setCartNotification({ successnotif: false, errornotif: false })

    const redundantCart = carttodisplay.find(
      cartItem => cartItem.CartItemName === name
    )

    if (!redundantCart) {
      const newCartItem = {
        CartId: carid,
        CartProductId: proid,
        CartOrder: cart,
        CartItemName: name,
        CartQuantity: count,
        CartPrice: price,
        CartItemPicture: picture
      }

      const newCartlist = [...carttodisplay];
      newCartlist.push(newCartItem)
      dispatch(cartListChange(newCartlist))

      setCartNotification({ successnotif: true })

      setTimeout(() => {
        setCartNotification({ successnotif: false })
      }, 1000)
    } else {
      setCartNotification({ errornotif: true })

      setTimeout(() => {
        setCartNotification({ errornotif: false })
      }, 1000)
    }
  }

  const deleteItem = (index, itemName) => {

    const newLog = {
      ItemName: itemName,
      ActionName: 'Item Removed',
      Action: 'added'
    }

    const itemindex = productstodisplay.findIndex(
      item => item.ItemName === itemName
    )

    const list = [...productstodisplay];
    list.splice(itemindex, 1)
    dispatch(itemListChange(list))

    const log = [...logs];
    log.push(newLog)
    dispatch(logListChange(log))
  }

  const setProductQuantity = (index) => {
    
    const json = JSON.parse(JSON.stringify(productstodisplay))
    console.log('unang json', json)
    json[index].ItemCount = parseInt(changeQuantity);
    console.log('pangalawang json', json)

    dispatch(itemListChange(json))
    console.log(json)

  }

  if (item.ItemCount == 0) {
    backgroundColor.push(styles.colorRed)
  } else if (item.ItemCount <= 10) {
    backgroundColor.push(styles.colorYellow)
  } else if (item.ItemCount >= 10) {
    backgroundColor.push(styles.colorGreen)
  }

  return (
    <div>
      <div className="card animate__animated animate__fadeIn animate__slow">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={item.ItemPicture} alt="Image not found." />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <div className="media-content">
              <p className="title is-4 has-text-weight-semi-bold">{item.ItemName}</p>
              <p className="subtitle is-6"><p> Price: <bold>P{item.ItemPrice}</bold></p></p>
            </div>
          </div>
        </div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Details</Accordion.Header>
            <Accordion.Body>
              <h6 className={backgroundColor}> Quantity: {item.ItemCount}</h6>
              <small>{item.ItemDescription}</small>
              <Col className="mb-2 mt-2">
                <Form>
                  {
                    !validateUser ?
                      item.ItemCount > 0 ?
                        <div>
                          <Row className="mb-2">
                            <Button onClick={() => {
                              AddItemtoCart(uuidv4(), item.ItemId, quantity, item.ItemCount, item.ItemName, item.ItemPrice, item.ItemPicture)
                            }}>Add to Cart</Button>
                          </Row>
                        </div>
                        : ""
                      : ""
                  }
                  {
                    validateUser ?
                      <Row className="mb-2 ">
                        <Form.Group className="mb-3">
                          <Form.Label>Total Quantity</Form.Label>
                          <Form.Control type="number" placeholder="Quantity" value={changeQuantity} onChange={(e) => {setChangeQuantity(e.target.value)}} />
                        </Form.Group>
                        <Button className="btn" variant="primary" onClick={() => {
                          setProductQuantity(indexitem)
                          console.log(changeQuantity)
                          console.log(indexitem)
                          }}>
                          Save Quantity
                        </Button>
                      </Row>
                      : null
                  }
                  {
                    validateUser ?
                      <Row className="mb-2 ">
                        <Button variant='danger' onClick={() => { deleteItem(key, item.ItemName) }}>Remove</Button>
                      </Row>
                      : null
                  }
                  {
                    alert ?
                      <div>
                        <Row className="mb-2">
                          <Alert variant='danger'>
                            Quantity Exceeded!
                          </Alert>
                        </Row>
                      </div> : null
                  }
                </Form>
              </Col>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  )
}

export default ItemCard