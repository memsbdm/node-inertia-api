import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler, errors as httpErrors } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'
import { errors as dbErrors } from '@adonisjs/lucid'
import { errors as vineErrors } from '@vinejs/vine'
import { errors as authErrors } from '@adonisjs/auth'
import ForbiddenException from '#core/exceptions/forbidden_exception'
import NotFoundException from '#core/exceptions/not_found_exception'
export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * Status pages are used to display a custom HTML pages for certain error
   * codes. You might want to enable them in production only, but feel
   * free to enable them in development as well.
   */
  protected renderStatusPages = app.inProduction

  /**
   * Status pages is a collection of error code range and a callback
   * to return the HTML contents to send as a response.
   */
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (error, { inertia }) => inertia.render('errors/not_found', { error }),
    '500..599': (error, { inertia }) => inertia.render('errors/server_error', { error }),
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    if (ctx.request.header('accept') === 'application/json') {
      if (error instanceof authErrors.E_UNAUTHORIZED_ACCESS) {
        return ctx.response.status(401).send({ errors: [error.message] })
      }

      if (error instanceof ForbiddenException) {
        return ctx.response.status(403).send({ errors: [error.message] })
      }

      if (error instanceof NotFoundException || error instanceof dbErrors.E_ROW_NOT_FOUND) {
        return ctx.response.status(404).send({ errors: [error.message] })
      }

      if (error instanceof httpErrors.E_ROUTE_NOT_FOUND) {
        return ctx.response.status(404).send({ errors: ['Route not found'] })
      }

      if (error instanceof vineErrors.E_VALIDATION_ERROR) {
        return ctx.response.status(422).send({ errors: error.messages })
      }

      return ctx.response.status(500).send({ errors: ['Internal server error'] })
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
