// import React, { Component } from 'react';
// import { NavLink } from "react-router-dom"
// import NavbarGroup from './NavGroup/Index';
// import { withRouter } from 'react-router-dom';
// import { connect } from "react-redux";
// import { TOOGLE_COLLAPSED } from '../../../../Actions/MenuActions';


// class Navbar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }


//     componentDidMount() {
//         const currentIndex = ((document.location.pathname).toString().split('/')).findIndex(id => id === this.props.collapse.id);
//         if (currentIndex > -1) {
//             this.props.onCollapseToggle(this.props.collapse.id, this.props.type);
//         }
//     }
//     render() {

//         const { isOpened, isTriggered } = this.props;



//         return (

//             <div className="nav-side-menu">
//                 <div className="brand">Brand Logo</div>
//                 <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

//                 <div className="menu-list">

//                     <ul id="menu-content" className="menu-content collapse out">
//                         {menu.map(nav => {
//                             let subMenuShow = '';
//                             const triggerIndex = isTriggered.findIndex(id => id === nav.id);
//                             const isOpenedIndex = isOpened.findIndex(id => id === nav.id);
//                             if (isOpenedIndex > -1) {
//                                 subMenuShow = 'show';
//                             }
//                             return nav.children ? <li id={nav.id} key={nav.id} className={`collapsed active parent-item ${subMenuShow}`}>
//                                 <a href="#" onClick={() => this.props.onCollapseToggle(nav.id, nav.type)}>
//                                     <i className={nav.icon}></i> {nav.name} <span className="arrow"></span>
//                                 </a>
//                                 <ul className="sub-menu">{nav.children.map(childItem => <li id={childItem.id} key={childItem.id} className="active"><a href={childItem.url} > {childItem.name}</a></li>)}</ul>
//                             </li> : <li key={nav.id} className="parent-item nav-item"><a href={nav.url} ><i className={nav.icon}></i> {nav.name}</a></li>
//                         })
//                         }

//                     </ul>
//                 </div>
//             </div>
//         )


//     }
// }




// const mapStateToProps = state => {
//     return {
//         layout: state.layout,
//         isOpened: state.reducer.isOpened,
//         isTriggered: state.reducer.isTriggered,
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


import React, { Component } from 'react'
import menus from '../../../routes/menus';
import NavGroup from './NavGroup/Index';
import Aux from '../../../constants/hoc/_Aux';
import { NavLink } from "react-router-dom"
import windowSize from 'react-window-size';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scroll)
    }

    scroll = () => {
        let ele = document.querySelector(".main-sidebar.sidebar-dark-primary");
        const scrollPosition = window.pageYOffset;
        if (scrollPosition > 60) {
            ele.style.position = "fixed";
            ele.style.transition = "none";
        } else {
            ele.style.position = 'absolute';
        }
    }

    UNSAFE_componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll);
    }

    render() {

        return (<Aux>
            <aside className={`main-sidebar sidebar-dark-primary elevation-4`}>
                <a href="index3.html" className="brand-link">
                    {/* <img
                        src="dist/img/AdminLTELogo.png"
                        alt="AdminLTE Logo"
                        className="brand-image img-circle elevation-3"
                    /> */}
                    <span className="brand-text font-weight-light">GN POS</span>
                </a>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            {/* <img
                                src="dist/img/user2-160x160.jpg"
                                className="img-circle elevation-2"
                                alt="User Image"
                            /> */}
                            User Image
                        </div>
                        <div className="info">
                            {/* <NavLink to="/user/profile" className="d-block">
                                {user.user.name}
                            </NavLink> */}
                        </div>
                    </div>
                    <div className="slimScrollDiv">
                        <nav className="mt-2">
                            <NavGroup items={menus} />
                        </nav>
                    </div>
                </div>
            </aside>
        </Aux >)
    }
}

export default windowSize(Navigation);


