import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

function setupSwagger(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle('TD-OLLAMA API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  };

  function documentFactory() {
    return SwaggerModule.createDocument(app, config, options);
  }

  SwaggerModule.setup('api', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');
  app.enableCors();

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
