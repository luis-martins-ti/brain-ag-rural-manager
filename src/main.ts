import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerInterceptor } from './shared/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggerInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Rural Manager API')
    .setDescription('API para gerenciamento de produtores rurais')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const fs = require('fs');
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  await app.listen(3000);
}
bootstrap();
