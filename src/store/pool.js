import axios from 'axios';
// import history from '../history';

const GOT_LIKED_ME = 'GOT_LIKED_ME';
const GOT_TO_JUDGE = 'GOT_TO_JUDGE';
const LIKED_OR_DISLIKED = 'LIKED_OR_DISLIKED';
const MATCHED_OR_DIDNT_MATCH = 'MATCHED_OR_DIDNT_MATCH';
const GOT_MATCHES = 'GOT_MATCHES';

const defaultPool = {
  toJudge: [],
  usersWhoLikedMe: [],
  matches: []
};
const gotMatches = users => ({ type: GOT_MATCHES, users });
const gotLikedMe = users => ({ type: GOT_LIKED_ME, users });
const gotToJudge = toJudge => ({ type: GOT_TO_JUDGE, toJudge });
const likedOrDisliked = () => ({ type: LIKED_OR_DISLIKED });
const matchedOrDidntMatch = () => ({ type: MATCHED_OR_DIDNT_MATCH });

export const getLikedMe = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/pool/likedMe');
    dispatch(gotLikedMe(data));
  } catch (error) {
    console.error(error);
  }
};

export const getMatches = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/pool/matches');
    dispatch(gotMatches(data));
  } catch (error) {
    console.error(error);
  }
};

export const getToJudge = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/pool/toJudge');
    dispatch(gotToJudge(data));
  } catch (error) {
    console.error(error);
  }
};

export const makeDecision = (decisionType, otherUserId) => async dispatch => {
  try {
    await axios.put('/api/decision', { decisionType, otherUserId });
    if (decisionType === 'like' || decisionType === 'dislike') {
      dispatch(likedOrDisliked());
    }
    if (decisionType === 'match' || decisionType === 'dontMatch') {
      dispatch(matchedOrDidntMatch());
    }
  } catch (error) {}
};

export default function(state = defaultPool, action) {
  switch (action.type) {
    case GOT_MATCHES:
      const matches = [...action.users];
      return { ...state, matches };
    case GOT_LIKED_ME:
      const usersWhoLikedMe = [...action.users];
      return { ...state, usersWhoLikedMe };
    case GOT_TO_JUDGE:
      const toJudge = [...action.toJudge];
      return { ...state, toJudge };
    case LIKED_OR_DISLIKED:
      const toJudgeMinusOne = state.toJudge.slice(1);
      return { ...state, toJudge: toJudgeMinusOne };
    case MATCHED_OR_DIDNT_MATCH:
      const usersWhoLikedMeMinusOne = state.usersWhoLikedMe.slice(1);
      return { ...state, usersWhoLikedMe: usersWhoLikedMeMinusOne };
    default:
      return state;
  }
}
