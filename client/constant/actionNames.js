export default function getActionsNames(actionName) {
    actionName.toLowerCase();
    return ({
        add_: `Add_${actionName}`,
        edit_: `Edit_${actionName}`,
        get_: `Get_${actionName}`,
        delete_: `Delete_${actionName}`,
        search_: `Search_${actionName}`,
        filtering_: `Filter_${actionName}`,
        custom_: actionName
    })
}