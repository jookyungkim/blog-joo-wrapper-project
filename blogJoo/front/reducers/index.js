import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";
import category from "./category";
import comment from "./comment";
import search from "./search";
import hashtag from "./hashtag";

// (이전상태, 액션) => 다음상태
// combineReducers는 rudux들을 합처준다.
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;

    default: {
      const combindedReducer = combineReducers({
        user,
        post,
        category,
        comment,
        search,
        hashtag
      });
      return combindedReducer(state, action);
    }
  }
};

export default rootReducer;
