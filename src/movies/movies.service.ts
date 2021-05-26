import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movies.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    // NestJS는 Express, fastify 프레임워크를 사용함
    // 따라서 NestJS 문법을 사용하여 선택하여 사용 할 수 있음
    // fastify는 Express와 동일한 기능을 하지만 약 2배정도 빠르다고 함
    // 일반적으로 Express를 사용하지만 더 빠른 속도가 필요할 경우 fastify 사용
    // Express 형식의 Request, Respense 처리
    // getAll(@Req() req, @Res() res): Movie[] {
    //     res.json();
    //     return this.movies;
    // }

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);

        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id} not fount.`);
        }

        return movie;
    }

    deleteOne(id: number) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id)
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }

    update(id: number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
