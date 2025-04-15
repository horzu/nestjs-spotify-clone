import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { loginDTO } from 'src/auth/dto/login-dto';
import { ValidateTokenDTO } from 'src/auth/dto/validate-token-dto';
import { Enable2FAType } from './types';
import { JwtGuard } from './jwt-guard';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() userDTO: createUserDto): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  login(
    @Body() loginDTO: loginDTO,
  ): Promise<
    { accessToken: string } | { validate2FA: string; message: string }
  > {
    return this.authService.login(loginDTO);
  }

  @Get('enable-2fa')
  @UseGuards(JwtGuard)
  enable2FA(@Request() req): Promise<Enable2FAType | undefined> {
    return this.authService.enable2FA(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtGuard)
  validate2FA(
    @Request()
    req,
    @Body()
    ValidateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean } | undefined> {
    return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token,
    );
  }

  @Get('disable-2fa')
  @UseGuards(JwtGuard)
  disable2FA(@Request() req): Promise<UpdateResult | undefined> {
    return this.authService.disable2FA(req.user.userId);
  }
}
