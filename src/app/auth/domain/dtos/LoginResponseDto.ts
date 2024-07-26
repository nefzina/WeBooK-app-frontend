import {IRole} from "../../../profile/domain/interface/IRole";
import {IMedia} from "../../../profile/domain/interface/IMedia";

export class LoginResponseDto {
  constructor(public id: number, public role: IRole, public username: string, public profilePicture: IMedia) {
  }
}
