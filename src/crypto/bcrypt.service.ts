import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptService {

  private SALT = 10;

  hash(data: string) {
    return bcrypt.hashSync(data, this.SALT);
  }

  compare(data: string, hash: string) {
    return bcrypt.compareSync(data, hash);
  }

}