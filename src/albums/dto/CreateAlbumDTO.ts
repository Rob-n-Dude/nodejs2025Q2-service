import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { CreateAlbum } from '../albums.types';

export class CreateAlbumDTO implements CreateAlbum {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Year is required' })
  @IsNumber({}, { message: 'Year must be a number' })
  year: number;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsOptional()
  @IsString({ message: 'Artist ID must be a string or null' })
  artistId?: string | null;
}
