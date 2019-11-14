import getActionsNames from "../constant/ActionNames";


export default function getCommonActions(actionName) {
    const action = getActionsNames(`${actionName}`);
    return ({
        get: (items) => ({
            type: action.get_,
            payload: items
        }),
        add: (item) => ({
            type: action.add_,
            payload: item
        }),
        edit: (items) => ({
            type: action.edit_,
            payload: {
                items
            }
        }),
        remove: (item) => ({
            type: action.delete_,
            payload: item
        }),
        custom: (item) => ({
            type: action.custom_,
            payload: {
                item
            }
        }),
    })
}