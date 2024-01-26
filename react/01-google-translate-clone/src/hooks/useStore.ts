import { useReducer } from 'react'
import { type Language, type Action, type State, type FromLanguage } from '../types'
import { AUTO_LANGUAGE } from '../constants'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function reducer (state: State, action: Action) {
  const { type } = action

  switch (type) {
    case 'INTERCHANGE_LANGUAGES':{
      if (state.fromLanguage === AUTO_LANGUAGE) return state

      const loading = state.fromText !== ''

      return {
        ...state,
        loading,
        result: '',
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    }
    case 'SET_FROM_LANGUAGE':{
      if (state.fromLanguage === action.payload) return state

      const loading = state.fromText !== ''

      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        loading
      }
    }

    case 'SET_TO_LANGUAGE':{
      if (state.toLanguage === action.payload) return state

      const loading = state.fromText !== ''
      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        loading
      }
    }

    case 'SET_FROM_TEXT':{
      const loading = action.payload !== ''
      return {
        ...state,
        fromText: action.payload,
        result: '',
        loading
      }
    }
    case 'SET_RESULT':
      return {
        ...state,
        loading: false,
        result: action.payload
      }

    default:
      return state
  }
}

export function useStore () {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  // Create functions to use the dispatch in the component. NEVER return the dispatch becuase in the future you may use another tech stack in the App and you'll be making all of those component to follow a contract that nobody wants.
  const interchangeLanguages = () => { dispatch({ type: 'INTERCHANGE_LANGUAGES' }) }

  const setFromLanguage = (payload: FromLanguage) => { dispatch({ type: 'SET_FROM_LANGUAGE', payload }) }

  const setToLanguage = (payload: Language) => { dispatch({ type: 'SET_TO_LANGUAGE', payload }) }

  const setFromText = (payload: string) => { dispatch({ type: 'SET_FROM_TEXT', payload }) }

  const setResult = (payload: string) => { dispatch({ type: 'SET_RESULT', payload }) }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
