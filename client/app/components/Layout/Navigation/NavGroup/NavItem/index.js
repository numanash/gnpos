import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
class NavItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>
            {this.props.item.icon ?
                <li key={this.props.item.id} className="nav-item  parent-item"><NavLink to={this.props.item.url} ><i className={this.props.item.icon}></i> {this.props.item.name}</NavLink></li>
                :
                <li id={this.props.item.id} key={this.props.item.id} className="nav-item"><NavLink to={this.props.item.url} > {this.props.item.name}</NavLink></li>
            }
        </div>);
    }
}

export default NavItem;