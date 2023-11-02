export type { OpenDialogOptions, OpenDialogReturnValue } from 'electron'

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer U> ? U : never

export type Apps = 'reader' | 'settings'
