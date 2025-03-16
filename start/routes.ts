/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const SocialAuthController = () => import('#auth/controllers/social_auth_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')

// Web routes
router.on('/').renderInertia('home').middleware(middleware.silentAuth())
router.get('/oauth/google/redirect', [SocialAuthController, 'redirect']).as('oauth.google.redirect')
router.get('/oauth/google/callback', [SocialAuthController, 'callback'])
router.delete('/auth/logout', [LogoutController, 'logout']).as('auth.logout')

// API routes
router
  .group(() => {
    router.post('/oauth/google/callback', [SocialAuthController, 'apiCallback'])
  })
  .prefix('/api/v1')
