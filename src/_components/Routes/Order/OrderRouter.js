import React, { Component } from "react";
// import "../../../assets/css/Cart.css";
import connect from "react-redux/es/connect/connect";


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CartItem from "../../Cart/CartItem";
import {getOrderStatusCompleted, getOrderStatusPending, updateOrderStatus} from "../../../actions/cartAction";



class OrderRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {

        if (this.props.location.search === ""){
            this.props.getOrderStatusCompleted(this.props.dataStatePosts.userData.userEmail);
        }
    }


    render() {

           console.log("prev");
           console.log(this.props);

        let cart= this.props.dataStateCart.cartComplete;
        let cartItems = [];
        console.log("STE");
        // console.log(this.props.dataStateCart);
        console.log("STQ");

        if (cart !== undefined) {
            console.log("STE1");
            console.log(cart);
            console.log("STQ1");
                cart.map(cartItem =>
                    cartItems = cartItem.orderline
                );
                //cartItems = cart[0].orderline;
                console.log("Cart Items here" + JSON.stringify(cart));
        }
        return (
            <div>
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} size = 'lg'>
                        <ModalBody>
                            <CartItem data = {cartItems}/>
                        </ModalBody>
                    </Modal>
                </div>
                <div className="container">
                    <p className="text-secondary float-left" style={{ fontSize: "30px" }}>
                        Order Summary
                    </p>

                    {cartItems.length > 0 ? (
                        <table id="cart" className="table table-hover table-condensed">
                            <thead>
                            <tr>
                                <th styles="width:50%">Order_ID</th>
                                <th styles="width:10%">Total_Price</th>
                                <th styles="width:8%">Payment_Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart.map(cart => (
                                <tr onClick={this.toggle}>
                                    <td>{cart.orderId}</td>
                                    <td>{cart.totalPrice}</td>
                                    <td>{cart.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>

                            <h1>"Your order list is Empty..."</h1>
                        </div>
                    )}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dataStateCart: state.cart,
    dataStatePosts: state.posts,
});

const mapActionToProps = {
    getOrderStatusCompleted,
    getOrderStatusPending,
    updateOrderStatus,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(OrderRouter);
