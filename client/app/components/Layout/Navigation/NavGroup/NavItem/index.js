import React, { Component } from 'react';

class NavItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>
            {this.props.item.icon ?
                <li key={this.props.item.id} className="nav-item  parent-item"><a href={this.props.item.url} ><i className={this.props.item.icon}></i> {this.props.item.name}</a></li>
                :
                <li id={this.props.item.id} key={this.props.item.id} className="nav-item"><a href={this.props.item.url} > {this.props.item.name}</a></li>
            }
        </div>);
    }
}

export default NavItem;