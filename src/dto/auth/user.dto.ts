import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Role } from "@prisma/client";

export class User {

    @IsString()
    @IsNotEmpty()
    fullname: string;


    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsString()
    role: Role;
}