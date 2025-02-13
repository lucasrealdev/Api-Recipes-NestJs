import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Recipes')
    .setDescription(
      'Esta é uma API RESTful de gerenciamento de receitas, desenvolvida com NestJS e MongoDB. A API permite criar, ler, atualizar e excluir receitas, com funcionalidades avançadas como filtros e ordenações.',
    )
    .setVersion('1.0')
    .addTag('Recipes')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}

bootstrap();
