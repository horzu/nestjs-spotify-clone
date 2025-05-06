import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song.dto';
import { Paginated } from 'nestjs-paginate';
import { ArtistJwtGuard } from 'src/auth/artist-jwt-guard';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  @UseGuards(ArtistJwtGuard)
  create(
    @Body() CreateSongDto: CreateSongDto,
    @Request() request,
  ): Promise<Song> {
    return this.songsService.create(CreateSongDto);
  }
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Paginated<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      path: 'songs',
      page,
      limit,
    });
  }
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song | null> {
    return this.songsService.findOne(id);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecord: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateRecord);
  }
  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return this.songsService.delete(id);
  }
}
