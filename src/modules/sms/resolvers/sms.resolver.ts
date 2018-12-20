import { Inject, OnModuleInit } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'

import { ISmsServiceInterface } from '../sms.interface'
import { NotaddGrpcClientFactory } from '../../../grpc/grpc.client-factory'

@Resolver()
export class SmsResolver implements OnModuleInit {
  onModuleInit() {
    this.smsServiceInterface = this.notaddGrpcClientFactory.smsModuleClient.getService<ISmsServiceInterface>('SmsService')
  }

  constructor(
    @Inject(NotaddGrpcClientFactory) private readonly notaddGrpcClientFactory: NotaddGrpcClientFactory
  ) { }

  private smsServiceInterface: ISmsServiceInterface

  @Query('sendMessage')
  async sendMessage(req, body: { name: string }) {
    const { msg } = await this.smsServiceInterface.sendMessage({
      name: body.name
    }).toPromise()
    return { code: 200, message: 'success', data: msg }
  }

  @Query('verifyMessage')
  async verifyMessage(req: any, body: { mobile: string }) {
    const { msg } = await this.smsServiceInterface.verifyMessage({
      mobile: body.mobile
    }).toPromise()
    return { code: 200, message: 'success', data: msg }
  }
}
