import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const data = {
      ...(dto.password && { hash: await argon.hash(dto.password) }),
      ...(dto.firstName && { firstName: dto.firstName }),
      ...(dto.lastName && { lastName: dto.lastName }),
    };

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    return user;
  }
}
