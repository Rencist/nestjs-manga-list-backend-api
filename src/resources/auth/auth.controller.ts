import { Controller, Post, Body, BadRequestException, UseGuards, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { JwtService } from '../../guards/jwt/jwt.service';
import { ForbiddenException } from '../../exceptions/exception';
import { LoginDto } from '../../dto/auth/auth.dto'
import { User } from '../../dto/auth/user.dto'
import { Token } from '../../decorators/token.decorator';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @Post('register')
  async register(@Body() User: User)
  {
    try
    {
      const success = await this.authService.register(User);
      let message = ""
      if(success)
        message = 'Register berhasil';
      else
        message = 'Register gagal';
      return { message };

    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post('login')
  async login(@Body() LoginDto: LoginDto) 
  {
    try
    {
      const user = await this.authService.login(LoginDto);

      const token = await this.jwtService.create({ uid: user.id })
      const message = 'Login berhasil';
      return { message, token };

    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Token('uid') uid: string) {

    try {
      const user =  await this.authService.getUser(uid)
      delete user.password;

      return user;
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}
