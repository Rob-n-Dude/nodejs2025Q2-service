import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDTO {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsOptional()
  @IsBoolean({ message: 'Grammy status must be a boolean' })
  grammy?: boolean;
}
