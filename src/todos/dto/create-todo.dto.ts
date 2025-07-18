import {IsNotEmpty, IsBoolean, IsOptional, IsString} from 'class-validator';
export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsOptional()
    completed: boolean;
}