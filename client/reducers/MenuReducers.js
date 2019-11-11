import * as actionTypes from '../Actions/MenuActions';
import configuration from '../Config';

// const initialState = {
//     isOpen: [], //for active default menu
//     isTrigger: [], //for active default menu, set blank for horizontal
//     ...config,
//     isFullScreen: false, // static can't change
// };



const initialState = {
    isOpened: [],
    isTriggered: [],
    ...configuration,
    ifFullScreen: false
}

const MenuReducer = (state = initialState, action) => {
    let triggered = [], opened = [];
    switch (action.type) {
        case actionTypes.TOOGLE_COLLAPSED:
            if (action.menu.type === 'sub') {
                opened = state.isOpened;
                triggered = state.isTriggered;

                const triggerIndex = triggered.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    opened = opened.filter(id => id !== action.menu.id);
                    triggered = triggered.filter(id => id !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    opened = [...opened, action.menu.id];
                    triggered = [...triggered, action.menu.id];
                }
            } else {
                opened = state.isOpened;
                const triggerIndex = (state.isTriggered).indexOf(action.menu.id);
                triggered = (triggerIndex === -1) ? [action.menu.id] : [];
                opened = (triggerIndex === -1) ? [action.menu.id] : [];
            }
            return {
                ...state,
                isTriggered: triggered,
                isOpened: opened
            }
        default:
            return state
    }
}

export default MenuReducer;

// const reducer = (state = initialState, action) => {
//     let trigger = [];
//     let open = [];

//     switch (action.type) {
//         case actionTypes.COLLAPSE_MENU:
//             return {
//                 ...state,
//                 collapseMenu: !state.collapseMenu
//             };
//         case actionTypes.TOOGLE_COLLAPSED:
//             if (action.menu.type === 'sub') {
//                 open = state.isOpen;
//                 trigger = state.isTrigger;

//                 const triggerIndex = trigger.indexOf(action.menu.id);
//                 if (triggerIndex > -1) {
//                     open = open.filter(item => item !== action.menu.id);
//                     trigger = trigger.filter(item => item !== action.menu.id);
//                 }

//                 if (triggerIndex === -1) {
//                     open = [...open, action.menu.id];
//                     trigger = [...trigger, action.menu.id];
//                 }
//             } else {
//                 open = state.isOpen;
//                 const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
//                 trigger = (triggerIndex === -1) ? [action.menu.id] : [];
//                 open = (triggerIndex === -1) ? [action.menu.id] : [];
//             }

//             return {
//                 ...state,
//                 isOpen: open,
//                 isTrigger: trigger
//             };
//         case actionTypes.NAV_CONTENT_LEAVE:
//             return {
//                 ...state,
//                 isOpen: open,
//                 isTrigger: trigger,
//             };
//         case actionTypes.NAV_COLLAPSE_LEAVE:
//             if (action.menu.type === 'sub') {
//                 open = state.isOpen;
//                 trigger = state.isTrigger;

//                 const triggerIndex = trigger.indexOf(action.menu.id);
//                 if (triggerIndex > -1) {
//                     open = open.filter(item => item !== action.menu.id);
//                     trigger = trigger.filter(item => item !== action.menu.id);
//                 }
//                 return {
//                     ...state,
//                     isOpen: open,
//                     isTrigger: trigger,
//                 };
//             }
//             return { ...state };
//         case actionTypes.FULL_SCREEN:
//             return {
//                 ...state,
//                 isFullScreen: !state.isFullScreen
//             };
//         case actionTypes.FULL_SCREEN_EXIT:
//             return {
//                 ...state,
//                 isFullScreen: false
//             };
//         case actionTypes.CHANGE_LAYOUT:
//             return {
//                 ...state,
//                 layout: action.layout
//             };
//         case actionTypes.CHANGE_SUB_LAYOUT:
//             return {
//                 ...state,
//                 subLayout: action.subLayout
//             };
//         case actionTypes.LAYOUT_TYPE:
//             return {
//                 ...state,
//                 layoutType: action.layoutType,
//                 headerBackColor: initialState.headerBackColor
//             };
//         case actionTypes.NAV_BACK_COLOR:
//             return {
//                 ...state,
//                 layoutType: (state.layoutType === 'menu-light') ? 'menu-dark' : state.layoutType
//             };
//         case actionTypes.HEADER_BACK_COLOR:
//             return {
//                 ...state,
//                 headerBackColor: action.headerBackColor
//             };
//         case actionTypes.RTL_LAYOUT:
//             return {
//                 ...state,
//             };
//         case actionTypes.NAV_FIXED_LAYOUT:
//             return {
//                 ...state,
//                 navFixedLayout: !state.navFixedLayout
//             };
//         case actionTypes.HEADER_FIXED_LAYOUT:
//             return {
//                 ...state,
//                 headerFixedLayout: !state.headerFixedLayout,
//                 headerBackColor: (!state.headerFixedLayout && initialState.headerBackColor === 'header-default') ? 'header-blue' : state.headerBackColor,
//             };
//         case actionTypes.BOX_LAYOUT:
//             return {
//                 ...state,
//                 boxLayout: !state.boxLayout
//             };
//         case actionTypes.RESET:
//             return {
//                 ...state,
//                 layout: initialState.layout,
//                 subLayout: initialState.subLayout,
//                 collapseMenu: initialState.collapseMenu,
//                 layoutType: initialState.layoutType,
//                 headerBackColor: initialState.headerBackColor,
//                 navFixedLayout: initialState.navFixedLayout,
//                 headerFixedLayout: initialState.headerFixedLayout,
//                 boxLayout: initialState.boxLayout
//             };
//         default:
//             return state;
//     }
// };
