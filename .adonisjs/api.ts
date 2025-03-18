// @ts-nocheck
/* eslint-disable */
// --------------------------------------------------
// This file is auto-generated by Tuyau. Do not edit manually !
// --------------------------------------------------

import type { MakeTuyauRequest, MakeTuyauResponse } from '@tuyau/utils/types'
import type { InferInput } from '@vinejs/vine/types'

type OauthGoogleRedirectGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/auth/controllers/social_auth_controller.ts').default['redirect'], false>
}
type OauthGoogleCallbackGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/auth/controllers/social_auth_controller.ts').default['callback'], false>
}
type AuthLogoutDelete = {
  request: unknown
  response: MakeTuyauResponse<import('../app/auth/controllers/logout_controller.ts').default['logout'], false>
}
type RestaurantsGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/restaurants/restaurants/controllers/list_restaurants_controller.ts').default['render'], false>
}
type RestaurantsIdUpdateGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/restaurants/restaurants/controllers/update_restaurant_controller.ts').default['render'], false>
}
type RestaurantsIdPatch = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/restaurants/restaurants/controllers/update_restaurant_controller.ts').default['UpdateValidator']>>
  response: MakeTuyauResponse<import('../app/restaurants/restaurants/controllers/update_restaurant_controller.ts').default['execute'], true>
}
type RestaurantsIdDelete = {
  request: unknown
  response: MakeTuyauResponse<import('../app/restaurants/restaurants/controllers/delete_restaurant_controller.ts').default['execute'], false>
}
type ApiV1OauthGoogleCallbackPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/auth/controllers/social_auth_controller.ts').default['apiCallback'], false>
}
type ApiV1RestaurantsIdUpdatePatch = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/restaurants/restaurants/controllers/update_restaurant_controller.ts').default['UpdateValidator']>>
  response: MakeTuyauResponse<import('../app/restaurants/restaurants/controllers/update_restaurant_controller.ts').default['apiExecute'], true>
}
type ApiV1RestaurantsIdDelete = {
  request: unknown
  response: MakeTuyauResponse<import('../app/restaurants/restaurants/controllers/delete_restaurant_controller.ts').default['apiExecute'], false>
}
export interface ApiDefinition {
  'oauth': {
    'google': {
      'redirect': {
        '$url': {
        };
        '$get': OauthGoogleRedirectGetHead;
        '$head': OauthGoogleRedirectGetHead;
      };
      'callback': {
        '$url': {
        };
        '$get': OauthGoogleCallbackGetHead;
        '$head': OauthGoogleCallbackGetHead;
      };
    };
  };
  'auth': {
    'logout': {
      '$url': {
      };
      '$delete': AuthLogoutDelete;
    };
  };
  'restaurants': {
    '$url': {
    };
    '$get': RestaurantsGetHead;
    '$head': RestaurantsGetHead;
    ':id': {
      'update': {
        '$url': {
        };
        '$get': RestaurantsIdUpdateGetHead;
        '$head': RestaurantsIdUpdateGetHead;
      };
      '$url': {
      };
      '$patch': RestaurantsIdPatch;
      '$delete': RestaurantsIdDelete;
    };
  };
  'api': {
    'v1': {
      'oauth': {
        'google': {
          'callback': {
            '$url': {
            };
            '$post': ApiV1OauthGoogleCallbackPost;
          };
        };
      };
      'restaurants': {
        ':id': {
          'update': {
            '$url': {
            };
            '$patch': ApiV1RestaurantsIdUpdatePatch;
          };
          '$url': {
          };
          '$delete': ApiV1RestaurantsIdDelete;
        };
      };
    };
  };
}
const routes = [
  {
    params: [],
    name: 'oauth.google.redirect',
    path: '/oauth/google/redirect',
    method: ["GET","HEAD"],
    types: {} as OauthGoogleRedirectGetHead,
  },
  {
    params: [],
    name: 'auth.logout',
    path: '/auth/logout',
    method: ["DELETE"],
    types: {} as AuthLogoutDelete,
  },
  {
    params: [],
    name: 'restaurants.render',
    path: '/restaurants',
    method: ["GET","HEAD"],
    types: {} as RestaurantsGetHead,
  },
  {
    params: ["id"],
    name: 'restaurants.update',
    path: '/restaurants/:id/update',
    method: ["GET","HEAD"],
    types: {} as RestaurantsIdUpdateGetHead,
  },
  {
    params: ["id"],
    name: 'restaurants.update.execute',
    path: '/restaurants/:id',
    method: ["PATCH"],
    types: {} as RestaurantsIdPatch,
  },
  {
    params: ["id"],
    name: 'restaurants.delete',
    path: '/restaurants/:id',
    method: ["DELETE"],
    types: {} as RestaurantsIdDelete,
  },
] as const;
export const api = {
  routes,
  definition: {} as ApiDefinition
}
