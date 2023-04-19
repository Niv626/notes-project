import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { request } from 'http';
import { EditUserDto } from 'src/user/dto';

describe('App e2e', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333')
  });


  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test1@gmail.com',
      password: '123456'
    }
    describe('SignUp', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect()
      })
    })
    describe('SignIn', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400);
      });
    
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)

          .stores('UserAt', 'access_token')
      })
    })
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .expectStatus(200)
          .withHeaders({
            Authorization: 'Bearer $S{UserAt}'
          })
      })
    })
    describe('Edit user', () => {})
  });

  describe('Note', () => {
    describe('Create note', () => {})
    describe('Get notes', () => {})
    describe('Edit note', () => {
      it('should get current user', () => {
        const dto: EditUserDto = {
          firstName: 'test',
          email: 'test@gmail.com'
        }
        return pactum
          .spec()
          .patch('/users/edit-user')
          .expectStatus(200)
          .withHeaders({
            Authorization: 'Bearer $S{UserAt}'
          })
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.firstName)

      })
    })
    describe('Delete note', () => {})


  });


  

}

);
