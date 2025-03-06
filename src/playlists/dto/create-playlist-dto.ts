import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createPlayListDTO {
  @IsString()
  @IsNotEmpty()
  readonly name;

  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, {each: true})
  readonly songs;

  @IsNotEmpty()
  @IsNumber()
  readonly user;
}
