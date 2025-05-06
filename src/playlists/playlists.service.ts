import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { In, Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { createPlayListDTO } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playListRepo: Repository<Playlist>,

    @InjectRepository(Song)
    private songsRepo: Repository<Song>,

    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(playListDTO: createPlayListDTO): Promise<Playlist> {
    const playList = new Playlist();

    playList.name = playListDTO.name;

    const songs = await this.songsRepo.findBy({ id: In(playListDTO.songs) });
    playList.songs = songs;

    const user = await this.usersRepo.findOneBy({ id: playListDTO.user });
    if (user) {
      playList.user = user;
    }

    return this.playListRepo.save(playList);
  }
}
