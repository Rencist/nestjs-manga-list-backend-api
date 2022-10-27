import { Injectable } from '@nestjs/common';
import { LoginDto } from '../../dto/auth/auth.dto';
import { User } from '../../dto/auth/user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { ThereIsAnErrorException } from '../../exceptions/exception';
const SALT_PASSWORD = 12;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(LoginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: LoginDto.email,
      },
    });

    if (!user) throw new ThereIsAnErrorException('User not found');

    // compare passwords
    const areEqual = await compare(LoginDto.password, user.password);

    if (!areEqual) throw new ThereIsAnErrorException('Authentication failed');
    delete user.password;
    return user;
  }

  async register(User: User) {
    const t = this;
    const success = await new Promise((resolve, reject) => {
      hash(User.password, SALT_PASSWORD, async function (err, hash) {
        User.password = hash;
        const user = await t.prisma.user.create({
          data: User,
        });
        // if (user) return "Email sudah terdaftar";
        if (!user) reject();
        resolve(user);
      });
    });
    return success;
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new ThereIsAnErrorException('User not found');

    return user;
  }
}
