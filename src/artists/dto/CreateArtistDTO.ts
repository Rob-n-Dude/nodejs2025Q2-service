import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDTO {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Grammy status is required' })
  @IsBoolean({ message: 'Grammy status must be a boolean' })
  grammy: boolean;
}
