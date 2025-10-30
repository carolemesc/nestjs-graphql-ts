import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core'; // 👈 importa o Reflector
import { IS_PUBLIC_KEY } from './public.decorator'; // 👈 importa a constante do decorador

// Define o tipo do request com a propriedade user
export interface AuthenticatedRequest extends Request {
  user?: any; // ou o tipo exato do payload do JWT
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector, // 👈 injeta o Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 🔍 verifica se a rota tem o decorator @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 se tiver, libera sem verificar token
      return true;
    }

    // se não for pública, faz a validação do token
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // adiciona o payload (dados do usuário) na requisição
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
