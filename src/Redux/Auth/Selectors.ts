import { createSelector } from '@reduxjs/toolkit'

import type { TAppStore } from '~/src/Configurations/AppStore'

export const SLICE_NAME = 'auth'

const select = (state: TAppStore) => state[SLICE_NAME]

export const getIsLoggedInSelector = createSelector(
  select,
  reducer => reducer.isLoggedIn
)

export const getAccessTokenSelector = createSelector(
  select,
  reducer => reducer.accessToken
)

export const getRefreshTokenSelector = createSelector(
  select,
  reducer => reducer.refreshToken
)
