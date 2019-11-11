import React from 'react';
import NavbarCollapse from './NavbarCollapse';
import NavbarItem from './NavbarItem';

const NavbarGroup = (props) => {
    let navbar = '';
    switch (props.type) {
        case "collapse":
            navbar = <NavbarCollapse />
            return;
        case "item":
            navbar = <NavbarItem />
            return;
        default:
            return false;
    }

}

export default NavbarGroup;