import { Body, Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login_user.dto';
import { JwtAuthGuard } from './gurads/auth.guards';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    login(@Body() loginUser: LoginUserDto) {
        return this.authService.login(loginUser);
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
