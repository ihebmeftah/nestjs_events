import { Body, Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login_user.dto';
import { JwtAuthGuard } from './gurads/auth.guards';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    login(@Body() loginUser: LoginUserDto) {
        return this.authService.login(loginUser);
    }

    @Post("register")
    register(@Body() registerUser: CreateUserDto) {
        return this.authService.register(registerUser);
    }

    @Get("verify")
    verify(@Request() req) {
        const token = req.headers['authorization'];
        return this.authService.verify(token);
    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    getProfile(
        @Request()
        req,
    ) {
        return req.user;
    }
}
