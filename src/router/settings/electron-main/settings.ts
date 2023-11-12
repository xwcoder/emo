import { Router } from '@/services/router/electron-main/router'
import * as settingService from '@/services/settings/electron-main/settings'

export const router = new Router({ prefix: '/settings' })

// const getTheme = () => settings.appearance === 'auto' ? 'system' : settings.appearance

router.use('get', (_, path) => settingService.get(path))

router.use('set', (_, { path, value }: { path: string, value: any }) => settingService.set(path, value))
