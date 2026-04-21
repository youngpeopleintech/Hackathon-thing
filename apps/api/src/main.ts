import { Logger, ValidationPipe } from "@nestjs/common";
import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3005",
    "https://theartificialfuture.com",
    "https://www.theartificialfuture.com",
    "https://ypit-registration.vercel.app",
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  };

  app.enableCors(corsOptions);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Set global prefix
  app.setGlobalPrefix("api");

  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 YPIT API is running on: http://localhost:${port}/api`,
    "Bootstrap",
  );
}

bootstrap();
