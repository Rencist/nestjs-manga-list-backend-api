import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  score: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  volumes: string;

  @IsString()
  @IsOptional()
  chapters: string;

  @IsString()
  @IsNotEmpty()
  synopsis: string;

  @IsString()
  @IsNotEmpty()
  picture_url: string;

  @IsString()
  @IsOptional()
  web_url: string;

  @IsString()
  @IsOptional()
  title_english: string;
}
