import { Logger, ValidationPipe } from "@nestjs/common";
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

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      try {
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      } catch (error) {
        Logger.error(error);
        callback(error, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  });

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
