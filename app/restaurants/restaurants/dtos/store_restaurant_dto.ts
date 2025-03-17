import { type UserId } from '#users/models/user'

export type StoreRestaurantDto = {
  userId: UserId
  title: string
  addressLine: string
  locality: string
  regionCode: string
  postalCode: string
  storeCode: string
}
