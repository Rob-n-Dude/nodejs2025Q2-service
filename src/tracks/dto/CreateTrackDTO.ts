import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { CreateTrack } from '../tracks.types';

export class CreateTrackDTO implements CreateTrack {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsString({ message: 'Artist ID must be a string or null' })
  @IsOptional()
  artistId: string | null;

  @ValidateIf((obj) => obj.albumId !== null)
  @IsString({ message: 'Album ID must be a string or null' })
  @IsOptional()
  albumId: string | null;

  @IsNumber({}, { message: 'Duration must be a number' })
  @IsNotEmpty({ message: 'duration is required' })
  duration: number;
}
