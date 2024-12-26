import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Missing access token');

    const response = await this.supabaseService.supabase.auth.getUser(token);

    if (response.error) {
      throw new UnauthorizedException('Invalid access token');
    }

    request.user = response.data; // Attach user to request
    return !!response.data.user;
  }
}
