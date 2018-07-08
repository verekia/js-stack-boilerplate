// @flow

export const NOTES_PATH = '/'
export const notePath = (id: ?string) => `/note/${id || ':id'}`
export const NEW_NOTE_PATH = '/new-note'
