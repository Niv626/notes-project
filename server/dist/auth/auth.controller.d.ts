import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private authService;
    private jwt;
    constructor(authService: AuthService, jwt: JwtService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
}
