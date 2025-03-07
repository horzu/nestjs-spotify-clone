import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UsersService){}

    @Post("signup")
    signup(@Body() userDTO: createUserDto): Promise<User>{
        return this.userService.create(userDTO)
    }
}
