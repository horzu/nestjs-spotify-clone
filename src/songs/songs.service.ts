import { Body, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDto } from './dto/update-song.dto';
import {
  paginate,
  Paginated,
  PaginateQuery,
  PaginateConfig,
} from 'nestjs-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releaseDate = songDTO.releaseDate;

    const artists = await this.artistsRepository.findBy(songDTO.artists);
    song.artists = artists;

    return this.songsRepository.save(song);
  }
  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song | null> {
    return this.songsRepository.findOneBy({ id });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete({ id });
  }

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }

  async paginate(options: PaginateQuery): Promise<Paginated<Song>> {
    const config: PaginateConfig<Song> = {
      sortableColumns: ['releaseDate'],
    };
    return paginate(options, this.songsRepository, config);
  }
}
