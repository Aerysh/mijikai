import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      status: 'success',
      message: 'Welcome to mijikai',
      version: '0.0.1',
      url: 'https://github.com/Aerysh/mijikai',
    };
  }
}
