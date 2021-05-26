import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movies.entity';
import { MoviesService } from './movies.service';

// localhost:3000/movies
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get("search")
    search(@Query("year") searchingYear: string) {
        return `We are searching for a movie witha title: ${searchingYear}`;
    }

    @Get(":id")
    getOne(@Param('id') movieId: number): Movie {
        return this.moviesService.getOne(movieId)
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }

    @Delete(':id')
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }
    // 리소스 일부분만 업데이트
    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        console.log("constroller: " + JSON.stringify(updateData));
        return this.moviesService.update(movieId, updateData);
    }

    // 리소스 전체 업데이트
    // @Put()
    // put() {
    //     return '';
    // }
}
