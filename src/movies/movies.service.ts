import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entity/movies.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie {
        const movie = this.movies.find(movie => movie.id === parseInt(id));

        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id} not fount.`);
        }

        return movie;
    }

    deleteOne(id: string) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id)
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }

    update(id: string, updateData) {
        // console.log("service: " + JSON.stringify(updateData));

        console.log("1: " + id);
        console.log("2: " + JSON.stringify(updateData));
        const movie = this.getOne(id);
        console.log("3: " + JSON.stringify(movie));
        console.log("4: " + JSON.stringify(this.movies));
        this.deleteOne(id);
        console.log("5: " + JSON.stringify(this.movies));
        console.log("6: " + JSON.stringify(movie));
        console.log("7: " + JSON.stringify(updateData));
        this.movies.push({...movie, ...updateData});
        console.log("8: " + JSON.stringify(this.movies));
    }
}
