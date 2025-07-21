import {IsNotEmpty, IsBoolean, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Alışveriş yap', description: 'Todo başlığı' })
    title: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ example: false, description: 'Todo tamamlandı mı?' })
    completed: boolean;
}