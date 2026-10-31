import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expectedUser = this.configService.get<string>("ADMIN_USER");
    const expectedPass = this.configService.get<string>("ADMIN_PASSWORD");

    if (!expectedUser || !expectedPass) {
      throw new ServiceUnavailableException(
        "Admin access is not configured. Set ADMIN_USER and ADMIN_PASSWORD.",
      );
    }

    const request = context.switchToHttp().getRequest<{ headers: { authorization?: string } }>();
    const header = request.headers.authorization;
    if (!header?.startsWith("Basic ")) {
      throw new UnauthorizedException("Authentication required");
    }

    let decoded = "";
    try {
      decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
    } catch {
      throw new UnauthorizedException("Authentication required");
    }

    const colon = decoded.indexOf(":");
    if (colon === -1) {
      throw new UnauthorizedException("Authentication required");
    }

    const user = decoded.slice(0, colon);
    const password = decoded.slice(colon + 1);
    if (user !== expectedUser || password !== expectedPass) {
      throw new UnauthorizedException("Authentication required");
    }

    return true;
  }
}
