import actions from "../Actions/CommonActions";
import Http from "../Services/Http";
export default function (actionName) {
    let action = actions(actionName);
    return {
        customGet: (data) => {
            return (dispatch, getState) => {
                dispatch(action.get(data));
            }
        },
        fetchAll: (customAction) => {
            return (dispatch, getState) => {
                Http.get(`${actionName}${customAction ? `/${customAction}` : ""} `).then(
                    res => {
                        dispatch(action.get(res.data));
                    }
                ).catch(err => {
                    console.log({ err });
                })
            }
        },
        postNew: (data, customAction) => {
            return (dispatch, getState) => (
                new Promise((resolve, reject) => {
                    Http.post(`${actionName}${customAction ? `/${customAction}` : ""} `, data).then(
                        res => {
                            dispatch(action.add(res.data));
                            return resolve();
                        }).catch(err => {
                            const statusCode = err.response.status;
                            const error = {
                                statusCode,
                                ...err.response.data
                            };
                            return reject(error);
                        })
                })
            )
        },
        getSingle: (id, customAction) => {
            return (dispatch, getState) => (
                new Promise((resolve, reject) => {
                    Http.get(`${actionName}${customAction ? `/${customAction}` : ""}/${id}`).then(
                        res => {
                            dispatch(action.add(res.data));
                            return resolve();
                        }).catch(err => {
                            const statusCode = err.response.status;
                            const error = {
                                statusCode,
                                ...err.response.data
                            };
                            return reject(error);
                        })
                })
            )
        },
        update: (data, customAction) => {
            return (dispatch, getState) => (
                new Promise((resolve, reject) => {
                    Http.put(`${actionName}${customAction ? `/${customAction}` : ""} `, data).then(
                        res => {
                            dispatch(action.add(res.data));
                            return resolve();
                        }).catch(err => {
                            const statusCode = err.response.status;
                            const error = {
                                statusCode,
                                ...err.response.data
                            };
                            return reject(error);
                        })
                })
            )
        },
        delete: (customAction) => {
            return (dispatch, getState) => (
                new Promise((resolve, reject) => {
                    Http.delete(`${actionName}${customAction ? `/${customAction}` : ""}`).then(
                        res => {
                            dispatch(action.remove(res.data));
                            return resolve();
                        }).catch(err => {
                            const statusCode = err.response.status;
                            const error = {
                                statusCode,
                                ...err.response.data
                            };
                            return reject(error);
                        })
                })
            )
        },
    };
}