import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import SignedIn from './signedin'
import SignedOut from './signedout'
import logic from '../../logic'
import Products from '../Products'


class Navbar extends Component {



    // retrieveUser() {
    //     if (this.props.loggedIn)
    //         logic.retrieveUser()
    //             .then(user => {
    //                 this.setState({ user })
    //             })
    // }

    // componentDidMount() {
    //     if (this.props.loggedIn) {
    //         this.retrieveUser()
    //     }


    // }

    // componentWillReceiveProps(props) {
    //     if (props.loggedIn) {
    //         this.retrieveUser()
    //     }
    // }



    render() {
        return (


            <nav>
                <body>
                    <div class="navegacion">
                        <nav>
                            <ul>
                                <li><Link to="/" >HOME</Link> <span class="icon icon-up-dir"></span></li>
                                <li>  <Link to="/about" >About</Link><span class="icon icon-up-dir"></span></li>
                                <li>  <Link to="/contact" >Contact</Link><span class="icon icon-up-dir"></span></li>
                                <li>  <Link to="/products" >Products</Link><span class="icon icon-up-dir"></span></li>
                                <li>
                                    <p>User</p>
                                    <div class="submenu">
                                        <div class="submenu-items">
                                            {logic.__userApiToken__ && < SignedIn />}
                                        </div>
                                        <div class="submenu-items">
                                            {!logic.__userApiToken__ && <SignedOut />}
                                        </div>
                                        {/* <div class="submenu-items">
                                            <p>Submenu #3</p>
                                            <ul>
                                                <li><a href="#">Item #1</a></li>
                                                <li><a href="#">Item #2</a></li>
                                                <li><a href="#">Item #3</a></li>
                                            </ul>
                                        </div> */}
                                    </div>
                                </li>

                                <span className="py-2 d-none d-md-inline-block">
                                    {/* <Link to="/cart"><span role="img" aria-label="cart">🛒</span></Link> */}
                                    <Link to="/cart"><span role="img" aria-label="cart"><i className="fas fa-shopping-cart">{this.props.cartLength ? <span className="badge badge-pill badge-info">{this.props.cartLength}</span> : ''}</i> </span></Link>
                                </span>
                            </ul>
                        </nav>
                    </div>
                </body>

            </nav>

        )
    }

}

export default Navbar