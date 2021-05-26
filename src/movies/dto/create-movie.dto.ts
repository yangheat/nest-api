import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {

    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    // 필수요소가 아니여도 됨
    @IsOptional()
    // 각 배열의 요소가 존재하는지 체크
    @IsString({ each: true })
    readonly genres: string[];
}