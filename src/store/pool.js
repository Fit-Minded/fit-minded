<<<<<<< HEAD
import axios from "axios";
import history from "../history";
const GOT_LIKED_ME = "GOT_LIKED_ME";
const GOT_TO_JUDGE = "GOT_TO_JUDGE";
const MADE_DECISION = "MADE_DECISION";
const defaultPool = {
  toJudge: [],
  usersWhoLikedMe: []
};
const gotLikedMe = users => ({ type: GOT_LIKED_ME, users });
const gotToJudge = toJudge => ({ type: GOT_TO_JUDGE, toJudge });
const madeDecision = () => ({ type: MADE_DECISION });
=======
import axios from 'axios'
// import history from "../history";

const GOT_TO_JUDGE = 'GOT_TO_JUDGE'
const MADE_DECISION = 'MADE_DECISION'

const defaultPool = {
  toJudge: []
}

const gotToJudge = toJudge => ({ type: GOT_TO_JUDGE, toJudge })
const madeDecision = () => ({ type: MADE_DECISION })
>>>>>>> 3470cedde801dc1f7014f21ab9c3d4cbc6411b2a

export const getLikedMe = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/pool/likedMe");
    dispatch(gotLikedMe(data));
  } catch (error) {
    console.error(error);
  }
};

export const getToJudge = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/pool/toJudge')
    dispatch(gotToJudge(data))
  } catch (error) {
    console.error(error)
  }
}

export const makeDecision = (decisionType, otherUserId) => async dispatch => {
  try {
    await axios.put('/api/decision', { decisionType, otherUserId })
    dispatch(madeDecision())
  } catch (error) {}
}

export default function(state = defaultPool, action) {
  switch (action.type) {
    case GOT_LIKED_ME:
      const usersWhoLikedMe = [...action.users];
      return { ...state, usersWhoLikedMe };
    case GOT_TO_JUDGE:
      const toJudge = [...action.toJudge]
      return { ...state, toJudge }
    case MADE_DECISION:
      const toJudgeMinusOne = state.toJudge.slice(1)
      return { ...state, toJudge: toJudgeMinusOne }
    default:
      return state
  }
}
