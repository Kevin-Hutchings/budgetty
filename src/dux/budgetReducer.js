import axios from 'axios';

const initialState = {
   purchases: [],
   budgetLimit: null,
   loading: false,
}
const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';

export const requestBudgetData = () => {
   let data = axios.get('./api/budget-data')
   .then(res => res.data)
   .catch((e) => console.log(e))
   return {
      type: REQUEST_BUDGET_DATA,
      paylaod: data
   }
}

export default function reducer(state = initialState, action) {
   switch(action.type) {
      case `${REQUEST_BUDGET_DATA}_PENDING`: {
         return {
            ...state,
            loading: true,
         }
      }
      case `${REQUEST_BUDGET_DATA}_FULFILLED`: {
         return {
            ...state,
            ...action.paylaod,
            loading: false,
         }
      }
      default: return state;
   }
}