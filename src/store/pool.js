import axios from 'axios'
// import history from "../history";

const GOT_TO_JUDGE = 'GOT_TO_JUDGE'
const MADE_DECISION = 'MADE_DECISION'

const defaultPool = {
  toJudge: []
}

const gotToJudge = toJudge => ({ type: GOT_TO_JUDGE, toJudge })
const madeDecision = () => ({ type: MADE_DECISION })

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
