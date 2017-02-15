// @flow

import { APP_NAME } from './config'

export const isProd = process.env.NODE_ENV === 'production'

export const fullTitle = (pageTitle: string) => `${pageTitle} | ${APP_NAME}`
