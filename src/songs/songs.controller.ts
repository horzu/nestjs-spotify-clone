import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  create(@Body() CreateSongDto: CreateSongDto) {
    return this.songsService.create(CreateSongDto);
  }
  @Get()
  findAll() {
    try{
    return this.songsService.findAll();
    }
    catch(e){
        throw new HttpException(
            "server error", HttpStatus.INTERNAL_SERVER_ERROR,
            {
                cause: e,
            }
        )
    }
  }
  @Get(':id')
  findOne() {
    return 'Fetch song based on id';
  }
  @Put(':id')
  update() {
    return 'Update song based on id';
  }
  @Delete(':id')
  delete() {
    return 'Delete song based on id';
  }
}
