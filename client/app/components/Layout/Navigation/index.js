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


const Navigation = () => (
    <Aux>
        <div className="nav-side-menu">
            <div className="brand">Brand Logo</div>
            <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

            <div className="menu-list">
                <NavGroup items={menus} />
            </div>
        </div>
    </Aux>
)



export default Navigation;


