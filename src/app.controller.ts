import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from "express"

@Controller("api")
export class AppController {
  constructor(private readonly _appService: AppService, private _jwtService: JwtService) { }

  @Post("register")
  async Register(
    @Body("username") username: string,
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("confirm") confirm: string
  ) {

    const hashedPassword = await bcrypt.hash(password, 12)
    const hashConfirmPassword = await bcrypt.hash(confirm, 12)

    const user = await this._appService.CreateUser({
      username,
      name,
      email,
      password: hashedPassword,
      confirm_password: hashConfirmPassword
    })

    delete user.password
    delete user.confirm_password

    return {
      status: 200,
      message: "Successfully Create User",
      data: user
    }
  }

  @Post("login")
  async Login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this._appService.findOneUser({ email })

    if (!user) {
      throw new BadRequestException("Invalid Credentials")
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException("Invalid Credential")
    }

    const jwt = await this._jwtService.signAsync({ id: user.id })
    const cookies = response.cookie("jwt", jwt, { httpOnly: true })

    return {
      status: response.statusCode,
      message: "Successfully Login",
      data: `token ${jwt}`
    }
  }

  @Get("users")
  async GetUsers(@Req() request: Request) {

    try {
      const cookies = request.cookies["jwt"]
      const data = await this._jwtService.verifyAsync(cookies)

      if (!data) {
        throw new UnauthorizedException()
      }

      const user = await this._appService.findOneUser({ id: data["id"] })

      const { password, confirm_password, ...result } = user

      return {
        status: 200,
        message: "Successfully Get Users",
        // cookies: cookies, // data: data, // user: user,
        result
      }
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  @Post("logout")
  async LogoutUser(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("jwt")

    return {
      status: response.statusCode,
      message: "Successfully Logout User"
    }
  }
}
