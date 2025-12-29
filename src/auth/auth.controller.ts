import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTo } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDTo } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto:RegisterDTo){
        return this.authService.register(registerDto);
    }
    @Post('login')
    login(@Body() loginDto: LoginDTo){
        return this.authService.login(loginDto);
    }
}
