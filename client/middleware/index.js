import actions from "../Actions/CommonActions";
import Http from "../Services/Http";
export default function(actionName) {
  let action = actions(actionName);
  return {
    customGet: data => {
      return (dispatch, getState) => {
        dispatch(action.get(data));
      };
    },
    fetchAll: customAction => {
      return (dispatch, getState) => {
        new Promise((resolve, reject) => {
          Http.get(`${actionName}${customAction ? `/${customAction}` : ""} `)
            .then(res => {
              dispatch(action.get(res.data));
              return resolve(res.data);
            })
            .catch(err => {
              if (err.data.message) {
                return reject(err.data.message);
              } else {
                return reject({ message: "Something Wrong on Server" });
              }
            });
        });
      };
    },
    postNew: (data, customAction, options) => {
      return (dispatch, getState) =>
        new Promise((resolve, reject) => {
          Http.post(
            `${actionName}${customAction ? `/${customAction}` : ""} `,
            data,
            options
          )
            .then(res => {
              dispatch(action.add(res.data));
              return resolve(res.data);
            })
            .catch(err => {
              if (err.data.message) {
                return reject(err.data.message);
              } else {
                if (err.data) {
                  return reject({ message: err.data });
                }
                return reject({ message: "Something Wrong on Server" });
              }
            });
        });
    },
    getSingle: (id, customAction) => {
      return (dispatch, getState) =>
        new Promise((resolve, reject) => {
          Http.get(
            `${actionName}${customAction ? `/${customAction}` : ""}/${id}`
          )
            .then(res => {
              dispatch(action.add(res.data));
              return resolve(res.data);
            })
            .catch(err => {
              if (err.data.message) {
                return reject(err.data.message);
              } else {
                console.log({ err });
                return reject({ message: "Something Wrong on Server" });
              }
            });
        });
    },
    update: (data, customAction, options) => {
      return (dispatch, getState) =>
        new Promise((resolve, reject) => {
          Http.put(
            `${actionName}${customAction ? `/${customAction}` : ""} `,
            data,
            options
          )
            .then(res => {
              dispatch(action.add(res.data));
              return resolve(res.data);
            })
            .catch(err => {
              if (err.data.message) {
                return reject(err.data.message);
              } else {
                console.log({ err });
                return reject({ message: "Something Wrong on Server" });
              }
            });
        });
    },
    delete: customAction => {
      return (dispatch, getState) =>
        new Promise((resolve, reject) => {
          Http.delete(`${actionName}${customAction ? `/${customAction}` : ""}`)
            .then(res => {
              dispatch(action.remove(res.data));
              return resolve();
            })
            .catch(err => {
              if (err.data.message) {
                return reject(err.data.message);
              } else {
                console.log({ err });
                return reject({ message: "Something Wrong on Server" });
              }
            });
        });
    }
  };
}
