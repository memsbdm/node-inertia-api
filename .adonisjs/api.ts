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
] as const;
export const api = {
  routes,
  definition: {} as ApiDefinition
}
