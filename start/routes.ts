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
const DeleteRestaurantController = () =>
  import('#restaurants/restaurants/controllers/delete_restaurant_controller')
const ListRestaurantsController = () =>
  import('#restaurants/restaurants/controllers/list_restaurants_controller')
const EditRestaurantController = () =>
  import('#restaurants/restaurants/controllers/edit_restaurant_controller')
// Web routes
// Auth
router.on('/').renderInertia('home').middleware(middleware.silentAuth())
router.get('/oauth/google/redirect', [SocialAuthController, 'redirect']).as('oauth.google.redirect')
router.get('/oauth/google/callback', [SocialAuthController, 'callback'])
router.delete('/auth/logout', [LogoutController, 'logout']).as('auth.logout')

// Restaurants
router
  .get('/restaurants', [ListRestaurantsController, 'render'])
  .middleware(middleware.auth())
  .as('restaurants.render')
router
  .get('/restaurants/:id/edit', [EditRestaurantController, 'render'])
  .middleware(middleware.auth())
  .as('restaurants.edit')
router
  .delete('/restaurants/:id', [DeleteRestaurantController, 'execute'])
  .middleware(middleware.auth())
  .as('restaurants.delete')

// API routes
router
  .group(() => {
    router.post('/oauth/google/callback', [SocialAuthController, 'apiCallback'])
  })
  .prefix('/api/v1')
