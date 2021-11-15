import React, { useState, useEffect } from 'react'
import { FloatingLabel, Card, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AddItemCard.module.css';
import { itemListChange } from '../../redux/reducer/item-reducer';
import { logListChange } from '../../redux/reducer/log-reducer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AddItemCard = (props) => {


    const dispatch = useDispatch();
    const products = useSelector(state => state.items.itemlist);
    const logs = useSelector(state => state.logs.loglist);
    const token = useSelector(state => state.auth.auth_token);

    let notificationMessage,
        productNotificationMessage;

    const {
        productNotification,
        productValidationMessage,
        itemdetails,
    } = props;

    const clearData = () => {
        setFormErrors({
            itemName: "",
            itemNameStyle: [],
            itemPrice: "",
            itemPriceStyle: [],
            itemQuantity: "",
            itemQuantityStyle: [],
            itemDescription: "",
            itemDescriptionStyle: [],
            itemimage: "",
            itemimageStyle: [],
        })
    }

    const [itemData, setItemData] = useState({
        name: "",
        price: "",
        quantity: "",
        description: "",
        image: ""
    });

    const [formErrors, setFormErrors] = useState({
        itemName: "",
        itemNameStyle: [],
        itemPrice: "",
        itemPriceStyle: [],
        itemQuantity: "",
        itemQuantityStyle: [],
        itemDescription: "",
        itemDescriptionStyle: [],
        itemimage: "",
        itemimageStyle: [],
    });


    const [listProductValidationMessage, setListProductValidationMessage] = useState({
        productValidationMessage: 'Make sure to fill up all fields'
    })

    const [productNotif, setProductNotif] = useState({
        productNotification: false
    })


    const addNewItem = () => {

        if (!name || !price || !quantity || !description || !image) {
            productNotificationMessage = "Make sure to fill up all fields";
            setListProductValidationMessage({ productValidationMessage: productNotificationMessage })
            setProductNotif({ ...productNotification, productNotification: true })

            setTimeout(() => {
                setProductNotif({ ...productNotification, productNotification: false })
                setListProductValidationMessage({ productValidationMessage: '' })
            }, 5000)
        }

        if (name && price && quantity && description && image) {


            const newItem = {
                name,
                price,
                quantity,
                description,
                image
                //ItemPrice: parseInt(price),
                //ItemCount: parseInt(quantity),
                //ItemDescription: description,
                //ItemPicture: image
            }
            console.log(newItem)

            var token = localStorage.getItem('token');
            if (token) {
                axios.post('http://localhost:5000/products', {
                    name,
                    price,
                    quantity,
                    description,
                    image
                }, {
                    headers: {
                        'Authorization': token
                    }
                })
                    .then(function (response) {
                        console.log(response.status === 200);
                        if(response.status == 200){
                            alert("Product Successfully Added!")
                        }
                    })
            } else {
                console.log("Token Expired")
            }
            //.catch(function (error) {
            //    console.log(error);
            //    alert("Server Error!")
            //});

            //const newItem = {
            //    ItemId: uuidv4(),
            //    ItemName: name,
            //    ItemPrice: parseInt(price),
            //    ItemCount: parseInt(quantity),
            //    ItemDescription: description,
            //    ItemPicture: image
            //}
            //
            //const newLog = {
            //    ItemName: name,
            //    ActionName: 'New Item Added',
            //    Action: 'removed'
            //}
            //
            //
            //
            //const listdata = [...products, newItem]
            //const listlogs = [...logs, newLog]
            //
            //dispatch(itemListChange(listdata))
            //dispatch(logListChange(listlogs))

            setItemData({
                name: "",
                price: "",
                quantity: "",
                description: "",
                image: ""
            })

        }
    }


    const { itemname, itemprice, itemquantity, itemdescription, itemimage } = itemdetails;
    const {
        name,
        price,
        quantity,
        description,
        image
    } = itemData;

    const validateForm = () => {
        let errors = {
            itemNameStyle: [],
            itemPriceStyle: [],
            itemQuantityStyle: [],
            itemDescriptionStyle: [],
            itemimageStyle: []
        }

        if (!name) {
            errors.name = "Must Have Item Name"
            errors.itemNameStyle.push(styles.validation)
        }

        if (!price) {
            errors.price = "Must Have Item Price"
            errors.itemPriceStyle.push(styles.validation)
        }

        if (!quantity) {
            errors.quantity = "Must Have Item Price"
            errors.itemQuantityStyle.push(styles.validation)
        }


        if (!description) {
            errors.description = "Must Have Description"
            errors.itemDescriptionStyle.push(styles.validation)
        }

        if (!image) {
            errors.image = "Must Have Image Url"
            errors.itemimageStyle.push(styles.validation)
        }

        setFormErrors(errors)
    }

    useEffect(() => {
        validateForm();
    }, [name, price, quantity, description, image]);

    return (
        <div>
            <Card className="mb-1 animate__animated animate__fadeInDown">
                <Card.Body>
                    <Form>
                        {
                            productNotif.productNotification ?
                                <Alert variant="danger">
                                    <strong>{listProductValidationMessage.productValidationMessage}</strong>
                                </Alert> : ""
                        }
                        <h5 className="is-size-5 has-text-weight-bold">Add New Item</h5>
                        <Form.Group className="mb-1">
                            <Form.Label>Item Title:</Form.Label>
                            <Form.Control className={formErrors.itemNameStyle.join('')} type="text" placeholder="Item Name" onChange={(e) => setItemData({ ...itemData, name: e.target.value })} value={name} />
                        </Form.Group>
                        <Form.Group className="mb-1">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control className={formErrors.itemPriceStyle.join('')} type="number" placeholder="Price" onChange={(e) => setItemData({ ...itemData, price: e.target.value })} value={price} />
                        </Form.Group>
                        <Form.Group className="mb-1">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control className={formErrors.itemQuantityStyle.join('')} type="number" placeholder="Item Count" onChange={(e) => setItemData({ ...itemData, quantity: e.target.value })} value={quantity} />
                        </Form.Group>
                        <Form.Group className="mb-1">
                            <Form.Label>Details:</Form.Label>
                            <FloatingLabel label="Description" className="mb-3">
                                <Form.Control className={formErrors.itemDescriptionStyle.join('')} as="textarea" placeholder="Leave a comment here" onChange={(e) => setItemData({ ...itemData, description: e.target.value })} value={description} />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-1">
                            <Form.Label>Image:</Form.Label>
                            <Form.Control className={formErrors.itemimageStyle.join('')} type="text" placeholder="Image Url Link" onChange={(e) => setItemData({ ...itemData, image: e.target.value })} value={image} />
                        </Form.Group>
                        <Form.Group className="mt-3 text-center">
                            <Button
                                variant="primary"
                                onClick={() => {
                                    addNewItem()
                                }}
                            >Add Item</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default AddItemCard