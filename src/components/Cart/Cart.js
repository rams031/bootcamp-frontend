import React, { useState, useEffect } from 'react'
import Navigationbar from '../Navbar/Navigationbar';
import { Container, Card, Accordion, Navbar, NavDropdown, Nav, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux';
import { cartListChange } from '../../redux/reducer/cart-reducer';
import './Cart.module.css';

const Cart = (props) => {

  const dispatch = useDispatch();
  let carttodisplay = useSelector(state => state.cart.cartlist);

  const [test, setTest] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const message = [];
  const cartPrice = [];
  let totalorder = 0;
  let total = 0;


  const deleteCart = (index) => {
    setQuantity(0)
    const newCartlist = [...carttodisplay];
    newCartlist.splice(index, 1)
    dispatch(cartListChange(newCartlist))
  }


  useEffect(() => {
    calculateTotal();
  }, [quantity])

  const calculateTotal = () => {

    carttodisplay.map((item, index) => {
      totalorder = item.CartOrder * item.CartPrice;
      total = total + totalorder;
      setGrandTotal(total)
    })
  }



  return (
    <div className="cart">
      <Navigationbar />
      <Container  >
        <h1 className="has-text-weight-bold is-size-3">Cart</h1>

        {
          carttodisplay.length > 0 ?
            <div className="columns" style={{ border: '1px solid gray', margin: 10, borderRadius: 6, borderWidth: 2 }}>
              <div className="column"><h3 className="has-text-weight-bold is-size-5 "> Total Orders: <h3 style={{ color: 'black' }}>{carttodisplay.length}</h3></h3></div>
              <div className="column"><h3 className="has-text-weight-bold is-size-5 "> Total Order Amount: <h3 style={{ color: 'green' }}>P{grandTotal}</h3></h3></div>
            </div>
            : ""
        }

        {
          carttodisplay.length > 0 ?
            carttodisplay.map((item, index) => {
              cartPrice[index] = item.CartPrice;
              return (
                <Card className="mb-1 mt-1" key={index}>
                  <Col className="itemList">
                    <Card.Body>
                      <Row className="ml-5">
                        <Col><Card.Title><h1 className=" mt-5 has-text-weight-bold is-size-3">{index + 1}. {item.CartItemName}</h1></Card.Title></Col>
                        <Col>
                          <figure className="image is-128x128 mt-5">
                            <img src={item.CartItemPicture} />
                          </figure>

                        </Col>
                        <Col>
                          <div>
                            <h5 className="mt-5 has-text-weight-bold is-size-5">
                              Available Quantity: {item.CartQuantity}x
                            </h5>
                            <h4 style={{ color: 'green' }}> Total Price: {item.CartPrice} </h4>
                          </div>

                          <div className="field mt-4 mb-4">
                            <label>Order Quantity</label>
                            <div className="control has-icons-left has-icons-right">
                              <input className="input is-success" type="number" placeholder="Order Quantity"
                                value={item.CartOrder}
                                onChange={(e) => {

                                  let cart = [...carttodisplay];
                                  let cartDetails = JSON.parse(JSON.stringify(cart));


                                  if (cartDetails[index].CartQuantity < e.target.value) {
                                    message[index] = "Quantity Exceeded";
                                    //e.target.value = '';
                                    cartDetails[index].CartOrder = 0;
                                  } else {
                                    message[index] = null;
                                    cartDetails[index].CartOrder = e.target.value;
                                  }

                                  setTest(message)

                                  dispatch(cartListChange(cartDetails))
                                  setQuantity(e.target.value)

                                }} />
                              <span className="icon is-small is-left">
                                <i className="fas fa-plus"></i>
                              </span>
                              <span className="icon is-small is-right">
                                <i className="fas fa-minus" ></i>
                              </span>
                            </div>
                            <label style={{ color: 'red' }}>
                              {
                                test[index] ?
                                  test[index]
                                  : null
                              }
                            </label>
                          </div>

                        </Col>
                        <Col>
                          <div className="mt-5 has-text-weight-bold is-size-5" >
                            <h4 className="mt-5 mb-4 has-text-weight-bold is-size-5" > Total : P
                              {
                                item.CartOrder > 0 ?
                                  item.CartOrder * item.CartPrice
                                  : 0
                              }
                            </h4>
                            <Button className="mt-6 sm" variant="danger"
                              onClick={() => deleteCart(index)}>Remove to Cart</Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                </Card>
              )
            })
            : <h1 style={{ textAlign: 'center' }} >No Orders</h1>
        }
      </Container>

    </div>
  )
}

export default Cart
