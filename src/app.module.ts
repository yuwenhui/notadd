import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'

import { ErrorsInterceptor } from './common/interceptors/errors.interceptor'
import { GraphQLConfigService } from './graphql-config.service'
import { NotaddGrpcClientFactory } from './grpc/grpc.client-factory'
import { UserModule } from './modules/user/user.module'
import { SmsModule } from './modules/sms/sms.module'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphQLConfigService
    }),
    UserModule.forRoot({ i18n: 'zh-CN' }),
    SmsModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor
    },
    NotaddGrpcClientFactory
  ],
  exports: []
})
export class AppModule { }
