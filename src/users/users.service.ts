import { Injectable } from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Bilal',
      email: 'bilal@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Ali',
      email: 'bilal@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Abdulla',
      email: 'bilal@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Saad',
      email: 'bilal@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Ahmad',
      email: 'bilal@gmail.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
