import {IsNotEmpty, IsBoolean, IsOptional} from 'class-validator'

export class UpdateTodoDto {
    @IsNotEmpty()
    @IsOptional()
    title: string;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;
}