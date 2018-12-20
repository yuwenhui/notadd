import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'

import { SmsResolver } from './resolvers/sms.resolver'
import { ErrorsInterceptor } from '../../common/interceptors/errors.interceptor'
import { GraphQLConfigService } from '../../graphql-config.service'
import { NotaddGrpcClientFactory } from '../../grpc/grpc.client-factory'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphQLConfigService
    }),
    UserModule.forRoot({ i18n: 'zh-CN' })
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor
    },
    NotaddGrpcClientFactory,
    SmsResolver
  ],
  exports: []
})
export class SmsModule { }
