import React from 'react';
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';
import Aux from '../../../../constants/hoc/_Aux';

const NavGroup = (props) => {
    let navItems = props.items.map(item => {
        switch (item.type) {
            case "collapse":
                return <NavCollapse item={item} key={item.id} />
            case "item":
                return <NavItem item={item} key={item.id} />
            default:
                return false;
        }
    })
    return (
        <Aux>
            <ul id="menu-content" className="menu-content collapse out">
                {navItems}
            </ul>
        </Aux>
    )

}

export default NavGroup;