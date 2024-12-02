import { Body, Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login_user.dto';
import { JwtAuthGuard } from './gurads/auth.guards';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
    constructor(private readonly authService: AuthService,
        private userService: UsersService,
    ) { }

    @Post("login")
    @ApiOperation({ summary: 'This endpoint for login a new user' })
    @ApiOkResponse({ description: 'It will return the user in the response with access token' })
    @ApiBadRequestResponse({ description: 'Password incorrect' })
    @ApiNotFoundResponse({ description: 'Email not found' })
    login(@Body() loginUser: LoginUserDto) {
        return this.authService.login(loginUser);
    }

    @Post("register")
    @ApiOperation({ summary: 'This endpoint for register a new user' })
    @ApiCreatedResponse({ description: 'It will return the user in the response with access token' })
    @ApiConflictResponse({ description: 'Email or phone already exists' })
    register(@Body() registerUser: CreateUserDto) {
        return this.authService.register(registerUser);
    }

    @Get("verify")
    @ApiOperation({ summary: 'This endpoint for verify and get new a token' })
    @ApiOkResponse({ description: 'It will return a new access token' })
    @ApiUnauthorizedResponse({ description: 'Token is missing , expired or invalid format' })
    async verify(@Request() req) {
        const token = req.headers['authorization'];
        const user = await this.userService.findOneById(req.user);
        const accessToken = await this.authService.verify(token);
        return {
            accessToken,
            "user": user,
        };
    }
}

