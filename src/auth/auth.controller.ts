import { Body, Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login_user.dto';
import { JwtAuthGuard } from './gurads/auth.guards';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

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
    verify(@Request() req) {
        const token = req.headers['authorization'];
        return this.authService.verify(token);
    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'This endpoint for get logged user' })
    @ApiOkResponse({ description: 'It will return a logged user information' })
    getProfile(
        @Request()
        req,
    ) {
        return req.user;
    }
}

