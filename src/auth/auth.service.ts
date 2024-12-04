import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginUserDto } from './dto/login_user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }
    async login(loginUser: LoginUserDto) {
        const user = await this.userService.findOneByEmail(loginUser.email);
        const isMatch = await compare(loginUser.password, user.password);
        if (!isMatch) throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
        return {
            accessToken: this.jwtService.sign({ email: user.email, sub: user.id },),
            user
        };
    }

    async register(registerDto: CreateUserDto) {
        const createdUser = await this.userService.create(registerDto);
        return {
            accessToken: this.jwtService.sign({ email: createdUser.email, sub: createdUser.id },),
            user: createdUser
        };
    }
    async verify(bearertoken: string) {
        try {
            const token = bearertoken.split(' ')[1];
            if (!token) {
                throw new HttpException('Token is missing', HttpStatus.UNAUTHORIZED);
            }
            const decoded = this.jwtService.verify(token);
            const newToken = this.jwtService.sign(
                { email: decoded.email, sub: decoded.sub },
                { expiresIn: '1h' }
            );
            return newToken;
        } catch (error) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}
