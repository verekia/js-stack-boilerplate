// @flow

export const NOTES_PATH = '/'
export const notePath = (id: ?string) => `/note/${id || ':id'}`
