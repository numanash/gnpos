import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
class NavItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        if (this.props.item.icon)
            return (<li key={this.props.item.id} className="nav-item"><NavLink className="nav-link" to={this.props.item.url} ><i className={'nav-icon ' + this.props.item.icon}></i> {this.props.item.name}</NavLink></li>)
        else
            return (<li id={this.props.item.id} key={this.props.item.id} className="nav-item"><NavLink className="nav-link" to={this.props.item.url} > {this.props.item.name}</NavLink></li>)
    }
}

export default NavItem;