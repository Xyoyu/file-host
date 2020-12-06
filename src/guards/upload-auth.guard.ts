import { Observable } from 'rxjs'
import { configService } from 'src/config/config.service'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export class UploadAuthGuard implements CanActivate {
  private appUploadToken = configService.getUploadToken()

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const authorization =
      request.headers['Authorization'] || request.headers['authorization']

    return authorization === this.appUploadToken
  }
}
