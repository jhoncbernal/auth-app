export interface IJwt {
  sign(data: object, expiresIn?: string): Promise<string>;
  verify(token: string): Promise<any>;
}
