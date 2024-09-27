import { injectable } from "inversify";
import { NEXT_AUTH } from "@/backend/shared/config";
import { IJwt } from "@/backend/shared/interfaces/jwt.interface";
import { SignJWT, jwtVerify } from "jose";

@injectable()
export class Jsonwebtoken implements IJwt {
  async sign(data: any, expiresIn: string) {
    const alg = "HS256";
    const secret = new TextEncoder().encode(NEXT_AUTH.jwtSecret as string);

    try {
      return expiresIn
        ? new SignJWT(data)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime(expiresIn)
            .sign(secret)
        : new SignJWT(data)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .sign(secret);
    } catch (error) {
      throw `Failed to sign token ${error}`;
    }
  }

  async verify(token: string) {
    try {
      return await jwtVerify(
        token,
        new TextEncoder().encode(NEXT_AUTH.jwtSecret as string)
      );
    } catch (error) {
      throw `Unauthorized ${error}`;
    }
  }
}
