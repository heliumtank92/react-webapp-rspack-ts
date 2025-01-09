import { type ReducersMapObject, combineReducers } from 'redux'

import AuthReducer from './Auth/Reducer'
import { SLICE_NAME as AuthSliceName } from './Auth/Selectors'
import type { T_AUTH_REDUCER } from './Auth/TYPES'

import ServiceTrackerReducer from './ServiceTracker/Reducer'
import { SLICE_NAME as ServiceTrackerSliceName } from './ServiceTracker/Selectors'
import type { T_SERVICE_TRACKER_REDUCER } from './ServiceTracker/TYPES'

import ThemeReducer from './Theme/Reducer'
import { SLICE_NAME as ThemeSliceName } from './Theme/Selectors'
import { T_THEME_REDUCER } from './Theme/TYPES'

export type TReducers = {
  [AuthSliceName]: T_AUTH_REDUCER
  [ServiceTrackerSliceName]: T_SERVICE_TRACKER_REDUCER
  [ThemeSliceName]: T_THEME_REDUCER
}

const reducers: ReducersMapObject<TReducers> = {
  [AuthSliceName]: AuthReducer,
  [ServiceTrackerSliceName]: ServiceTrackerReducer,
  [ThemeSliceName]: ThemeReducer
}

export default combineReducers<ReducersMapObject<TReducers>>(reducers)

export const persistedReducers: (keyof TReducers)[] = []
