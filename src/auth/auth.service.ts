import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginUserDto } from './dto/login_user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }
    async login(loginUser: LoginUserDto) {
        const user = await this.userService.findOneByEmail(loginUser.email);
        const isMatch = await compare(loginUser.password, user.password);
        if (!isMatch) throw new HttpException('Password incorrect', HttpStatus.UNAUTHORIZED);
        return {
            accessToken: this.jwtService.sign({ email: user.email, sub: user.id },),
            user
        };
    }
}
