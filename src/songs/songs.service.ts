import { Body, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';

@Injectable()
export class SongsService {
    private readonly songs:any[] = [];

    create(@Body() createSongDto: CreateSongDto){
        this.songs.push(createSongDto);
        return this.songs;
    }
    findAll(){
        throw new Error("There is an error while reading DB.")
        return this.songs;
    }
}
