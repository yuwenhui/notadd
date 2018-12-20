import { Observable } from 'rxjs'

export interface ISmsServiceInterface {
  sendMessage(data: { name: string }): Observable<{ msg: string }>
  verifyMessage(data: { mobile: string }): Observable<{ msg: string }>
}
