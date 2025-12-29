import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDTo } from './dto/register.dto';
//import bcrypt from 'node_modules/bcryptjs';
import * as bcryptjs from "bcryptjs"
import { LoginDTo } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

     async register({ password, email, name }: RegisterDTo) {

        const user = await this.usersService.findOneByEmail(email)

        if (user) {
            throw new BadRequestException('El usuario ya existe');
        }

        const hashedPassword = await bcryptjs.hash(password, 5)

        await this.usersService.create({
            name,
            email,
            password: hashedPassword
        })

        return {
            message: "Usuario registrado exitosamente"
        }
    }
    async login({email, password}:LoginDTo){

        const user = await this.usersService.findOneByEmail(email);

        if(!user){
            throw new BadRequestException('Usuario no encontrado');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid){
            throw new BadRequestException('Contraseña incorrecta');
        }

        const payload = {email: user.email}

        const token = await this.jwtService.signAsync(payload);

        return{
            toke:token,
            email:user.email
        }



    }
}
