import React, { Component } from 'react';
import NavItem from '../NavItem';
import LopNavCollapse from './index.js';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { TOOGLE_COLLAPSED } from '../../../../../../actions/MenuAction';
import Aux from '../../../../../constants/hoc/_Aux';


class NavCollapse extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const currentIndex = ((document.location.pathname).toString().split('/')).findIndex(id => id === this.props.item.id);
        if (currentIndex > -1) {
            this.props.onCollapseToggle(this.props.item.id, this.props.item.type);
        }
    }


    render() {

        let navItems = '';

        const { isOpened, isTriggered } = this.props;
        let { name, id, icon, type } = this.props.item;

        let subMenuShow = '', isActive = '';
        const triggerIndex = isTriggered.findIndex(itemId => itemId === id);
        const isOpenedIndex = isOpened.findIndex(itemId => itemId === id);

        if (isOpenedIndex > -1) {
            subMenuShow = 'menu-open';
        }

        if (triggerIndex > - 1) {
            isActive = 'active';
        }


        if (this.props.item.children) {
            const items = this.props.item.children;
            navItems = items.map(item => {
                switch (item.type) {
                    case "collapse":
                        return <LopNavCollapse item={{ ...item, type: "sub" }} key={item.id} type="sub" />;
                    case "item":
                        return <NavItem item={item} key={item.id} />;
                    default:
                        return false;
                }
            })

        }

        let item = '';


        item = <li id={id} key={id} className={`nav-item has-treeview ${subMenuShow}`}>
            <Link to="#" className={`nav-link ${isActive}`} onClick={() => this.props.onCollapseToggle(id, type)}>
                {icon && <i className={icon}></i>} <p>{name}<i className="right fa fa-angle-left"></i></p>
            </Link>
            <ul className="nav nav-treeview">{navItems}</ul>
        </li>


        return <Aux>
            {item}
        </Aux>


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
export default connect(mapStateToProps, mapDispatchToProps)(NavCollapse);