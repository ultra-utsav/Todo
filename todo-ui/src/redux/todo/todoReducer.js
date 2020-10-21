const { todoAction } = require("./todoAction");

const initialState = {
  todos: [],
  pendingTodos: 0,
  inProgress: 0,
};

const makeState = (todos) => {
  let cnt = 0;
  todos.map((todo, index) => {
    if (todo.inProgress) cnt++;
  });
  return {
    todos,
    inProgress: cnt,
    pendingTodos: todos.length - cnt,
  };
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoAction.FETCH_TODOS:
      return makeState(action.payload);

    case todoAction.NEW_TODO:
      let todos = [...state.todos];
      let pendingTodos = state.pendingTodos + 1;
      todos.push(action.payload);
      return {
        ...state,
        todos,
        pendingTodos,
      };

    case todoAction.MARK_COMPLETE_TODO:
      let todos1 = state.todos.filter((todo, ind) => ind != action.payload);
      return makeState(todos1);

    case todoAction.MARK_IN_PROGRESS:
      let todos2 = [...state.todos];
      console.log(action.payload);
      todos2[action.payload].inProgress = true;
      return makeState(todos2);

    default:
      return state;
  }
};

export default todoReducer;
