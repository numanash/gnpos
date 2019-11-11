// import getActionsNames from "../Constant/ActionNames";

// export default function getCommonReducers(actionName) {
//     const actionNames = getActionsNames(actionName);

//     return (state = {
//         data: null
//     }, action) => {
//         switch (action.type) {
//             case actionNames.get_:
//                 return {
//                     ...state,
//                     data: action.payload
//                 };
//             case actionNames.add_:
//                 return {
//                     ...state,
//                     data: action.payload
//                 };
//             case actionNames.edit_:
//                 return {
//                     ...state,
//                     data: action.payload
//                 };
//             case actionNames.delete_:
//                 return {
//                     ...state,
//                     data: action.payload
//                 };
//             case actionNames.custom_:
//                 return {
//                     ...state,
//                     data: action.payload
//                 }
//             default:
//                 return state

//         }
//     }
// }