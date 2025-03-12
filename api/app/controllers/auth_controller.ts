import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async register() {
    return this.register.name
  }

  public async login() {
    return this.login.name
  }
}
