import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwt: JwtService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    // const user = await this.appService.findOne({email: dto.email});
    // const sessionId = uuid();
    // const jwt = await this.jwt.signAsync({ id: 'sd' });

    // res.cookie('jwt', jwt, {
    //   expires: new Date(new Date().getTime() + 30 * 1000),
    //   sameSite: 'none',
    //   httpOnly: true,
    // });
    // res.send(dto);
    return this.authService.signin(dto);
  }
}
