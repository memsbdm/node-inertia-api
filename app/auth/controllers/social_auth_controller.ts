import { AuthService } from '#auth/services/auth_service'
import type { StoreUserDto } from '#users/dtos/store_user_dto'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SocialAuthController {
  constructor(private authSvc: AuthService) {}

  redirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async callback({ ally, auth, response }: HttpContext) {
    const socialUser = await ally.use('google').user()
    let user = await this.authSvc.findByProviderID(socialUser.id)
    if (!user) {
      const dto: StoreUserDto = {
        name: socialUser.name,
        email: socialUser.email,
        oauthProviderID: socialUser.id,
      }

      user = await this.authSvc.register(dto)
    }

    await auth.use('web').login(user)
    return response.redirect().toPath('/')
  }

  async apiCallback({ ally, response, request }: HttpContext) {
    const { token } = request.only(['token'])

    let socialUser
    try {
      socialUser = await ally.use('google').userFromToken(token)
    } catch (error) {
      return response.unauthorized({
        error: 'Invalid token',
      })
    }

    let user = await this.authSvc.findByProviderID(socialUser.id)
    if (!user) {
      const dto: StoreUserDto = {
        name: socialUser.name,
        email: socialUser.email,
        oauthProviderID: socialUser.id,
      }

      user = await this.authSvc.register(dto)
    }

    const accessToken = await this.authSvc.generateAccessToken(user)
    return response.json({
      user,
      accessToken: accessToken.value!.release(),
    })
  }
}
