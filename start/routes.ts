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
const UpdateRestaurantController = () =>
  import('#restaurants/restaurants/controllers/update_restaurant_controller')
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
  .get('/restaurants/:id/update', [UpdateRestaurantController, 'render'])
  .middleware(middleware.auth())
  .where('id', router.matchers.uuid())
  .as('restaurants.update')
router
  .patch('/restaurants/:id', [UpdateRestaurantController, 'execute'])
  .middleware(middleware.auth())
  .where('id', router.matchers.uuid())
  .as('restaurants.update.execute')
router
  .delete('/restaurants/:id', [DeleteRestaurantController, 'execute'])
  .middleware(middleware.auth())
  .where('id', router.matchers.uuid())
  .as('restaurants.delete')

// API routes
router
  .group(() => {
    // OAuth
    router.post('/oauth/google/callback', [SocialAuthController, 'apiCallback'])

    // Restaurants
    router
      .patch('/restaurants/:id', [UpdateRestaurantController, 'apiExecute'])
      .middleware(middleware.auth({ guards: ['api'] }))
      .where('id', router.matchers.uuid())
    router
      .delete('/restaurants/:id', [DeleteRestaurantController, 'apiExecute'])
      .middleware(middleware.auth({ guards: ['api'] }))
      .where('id', router.matchers.uuid())
  })
  .prefix('/api/v1')
  .middleware(middleware.forceJsonResponse())
