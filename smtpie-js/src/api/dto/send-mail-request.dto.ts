import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendMailRequest {
  @IsNotEmpty()
  @ApiProperty()
  from: string;

  @IsNotEmpty()
  @ApiProperty()
  to: Array<string>;

  @ApiProperty()
  params?: any;

  @IsNotEmpty()
  @ApiProperty()
  subject: string;

  @ApiPropertyOptional()
  template?: string;

  @ApiPropertyOptional()
  templateUrl?: string;
}
