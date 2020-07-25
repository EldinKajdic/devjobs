import { useReducer } from 'react';

function reducer(state, action) {
    
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });
  return {
    error: false,
    jobs: [],
    loading: false,
  };
}
