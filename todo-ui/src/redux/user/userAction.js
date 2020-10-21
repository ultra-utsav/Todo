export const userAction = {
  SET_USER: "SET_USER",
};

const createSetUser = (name) => {
  return {
    type: userAction.SET_USER,
    payload: name,
  };
};

const setUser = (user) => (dispatch) => {
  const requestOptions = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify({ email: user.email, password: user.password }),
  };

  fetch("http://localhost:8085/login/", requestOptions)
    .then((res) => res.json())
    .then((data) => {
      dispatch(createSetUser(data.name));
    });
};

const authUser = () => (dispatch) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
  };
  fetch("http://localhost:8085/authenticate/", requestOptions)
    .then((res) => res.json())
    .then((data) => {
      if (data) dispatch(createSetUser(data.name));
    });
};

export { setUser, authUser };
