export const todoAction = {
  FETCH_TODOS: "FETCH_TODOS",
  NEW_TODO: "NEW_TODO",
  MARK_COMPLETE_TODO: "MARK_COMPLETE_TODO",
  MARK_IN_PROGRESS: "MARK_IN_PROGRESS",
};

const createFetchTodos = (todos) => {
  return {
    type: todoAction.FETCH_TODOS,
    payload: todos,
  };
};

const creatNewTodo = (todo) => {
  return {
    type: todoAction.NEW_TODO,
    payload: todo,
  };
};

const createMarkCompleteTodo = (index) => {
  return {
    type: todoAction.MARK_COMPLETE_TODO,
    payload: index,
  };
};

const createMarkInProgressTodo = (index) => {
  return {
    type: todoAction.MARK_IN_PROGRESS,
    payload: index,
  };
};

const fetchTodos = () => (dispatch) => {
  let requestOptions = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
  };

  fetch("http://localhost:8085/todo/getTodos", requestOptions)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        dispatch(createFetchTodos(data.todos));
      }
    });
};

const newTodo = (todo) => (dispatch) => {
  console.log(todo);
  const requestOptions = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify({ todo }),
  };

  fetch("http://localhost:8085/todo/addTodo ", requestOptions)
    .then((res) => res.json())
    .then((data) => {
      dispatch(creatNewTodo(data));
    });
};

const markCompleteTodo = (todo, index) => (dispatch) => {
  const requestOptions = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify({ todo }),
  };

  fetch("http://localhost:8085/todo/deleteTodo ", requestOptions).then(
    (res) => {
      if (res.status === 200) {
        dispatch(createMarkCompleteTodo(index));
      }
    }
  );
};

const markInProgressTodo = (todo, index) => (dispatch) => {
  const requestOptions = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    body: JSON.stringify({ todo }),
  };

  fetch("http://localhost:8085/todo/editTodo ", requestOptions).then((res) => {
    if (res.status === 200) {
      dispatch(createMarkInProgressTodo(index));
    }
  });
};

export { fetchTodos, newTodo, markCompleteTodo, markInProgressTodo };
