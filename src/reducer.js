export const intialState = {
    user: null,
    posts:[]
  };

  export const actionTypes = {
      SET_USER:'SET_USER',
      SET_POSTS:'SET_POSTS',
      SET_POST:'SET_POST',
  };

  const reducer = (state, action) =>{
      console.log(action);
      switch(action.type)
      {
          case actionTypes.SET_USER:
              return {
                  ...state,
                  user:action.user
              };

              case actionTypes.SET_POST:
                return {
                    ...state,
                    posts:[...state.posts,action.post]
                };

                case actionTypes.SET_POSTS:
                return {
                    ...state,
                    posts:action.posts
                };
        default:
            return state;
      }
  }

  export default reducer;