import React, { Component } from 'react';
import Aux from '../../../constants/hoc/_Aux';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { TOOGLE_COLLAPSED } from '../../../../Actions/MenuActions';

const menu = [
    {
        name: "Main Menu",
        icon: "fa fa-gift",
        id: "main-menu",
        type: "collapse",
        class: "",
        children: [
            {
                name: "Categories",
                id: "categories",
                type: "item",
                url: "/dashboard/categories"
            },
        ]
    },
    {
        name: "Main Menu",
        icon: "fa fa-gift",
        id: "main-menu2s",
        type: "collapse",
        class: "",
        children: [
            {
                name: "Categories",
                id: "categories",
                type: "item",
                url: "/dashboard/categories"
            },
        ]
    },
    {
        name: "New Menu",
        icon: "fa fa-dashboard",
        id: "new-menu",
        type: "item",
        url: "/dashboard/item"
    }
]
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {
        console.log(this.props);
    }
    render() {

        const { isOpened, isTriggered } = this.props;



        return (
            <Aux>
                <nav className="main-header navbar navbar-expand bg-white navbar-light border-bottom">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#">
                                <i className="fa fa-bars" />
                            </a>
                        </li>

                        <li className="nav-item d-none d-sm-inline-block" />

                        <li className="nav-item d-none d-sm-inline-block">
                            {/* <a href="#" className="nav-link">
          Contact
        </a> */}
                        </li>
                    </ul>
                    <button
                        className="nav-link float-right"
                        onClick={() => {
                            this.props.signOut();
                            cookie.remove("token-api");
                            window.loaction = "/user/login";
                        }}
                    >
                        Logout
            </button>


                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="#">
                                <i className="fa fa-comments-o" />
                                <span className="badge badge-danger navbar-badge">3</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <a href="#" className="dropdown-item">
                                    <div className="media">
                                        <img
                                            src="dist/img/user1-128x128.jpg"
                                            alt="User Avatar"
                                            className="img-size-50 mr-3 img-circle"
                                        />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                Brad Diesel
                          <span className="float-right text-sm text-danger">
                                                    <i className="fa fa-star" />
                                                </span>
                                            </h3>
                                            <p className="text-sm">Call me whenever you can...</p>
                                            <p className="text-sm text-muted">
                                                <i className="fa fa-clock-o mr-1" /> 4 Hours Ago
                        </p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item">
                                    <div className="media">
                                        <img
                                            src="dist/img/user8-128x128.jpg"
                                            alt="User Avatar"
                                            className="img-size-50 img-circle mr-3"
                                        />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                John Pierce
                          <span className="float-right text-sm text-muted">
                                                    <i className="fa fa-star" />
                                                </span>
                                            </h3>
                                            <p className="text-sm">I got your message bro</p>
                                            <p className="text-sm text-muted">
                                                <i className="fa fa-clock-o mr-1" /> 4 Hours Ago
                        </p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item">
                                    <div className="media">
                                        <img
                                            src="dist/img/user3-128x128.jpg"
                                            alt="User Avatar"
                                            className="img-size-50 img-circle mr-3"
                                        />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                Nora Silvester
                          <span className="float-right text-sm text-warning">
                                                    <i className="fa fa-star" />
                                                </span>
                                            </h3>
                                            <p className="text-sm">The subject goes here</p>
                                            <p className="text-sm text-muted">
                                                <i className="fa fa-clock-o mr-1" /> 4 Hours Ago
                        </p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item dropdown-footer">
                                    See All Messages
                  </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="#">
                                <i className="fa fa-bell-o" />
                                <span className="badge badge-warning navbar-badge">15</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <span className="dropdown-item dropdown-header">
                                    15 Notifications
                  </span>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item">
                                    <i className="fa fa-envelope mr-2" /> 4 new messages
                    <span className="float-right text-muted text-sm">
                                        3 mins
                    </span>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item">
                                    <i className="fa fa-users mr-2" /> 8 friend requests
                    <span className="float-right text-muted text-sm">
                                        12 hours
                    </span>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item">
                                    <i className="fa fa-file mr-2" /> 3 new reports
                    <span className="float-right text-muted text-sm">
                                        2 days
                    </span>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item dropdown-footer">
                                    See All Notifications
                  </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-widget="control-sidebar"
                                data-slide="true"
                                href="#"
                            >
                                <i className="fa fa-th-large" />
                            </a>
                        </li>
                    </ul>

                </nav>
            </Aux>
        )


    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCollapseToggle: (id, type) => dispatch({ type: TOOGLE_COLLAPSED, menu: { id: id, type: type } }),
    }
}


const mapStateToProps = state => {
    return {
        layout: state.layout,
        isOpened: state.reducer.isOpened,
        isTriggered: state.reducer.isTriggered,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);