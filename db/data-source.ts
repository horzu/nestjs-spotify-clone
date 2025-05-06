import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { use } from 'passport';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmAsyncConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get('dbHost'),
      port: configService.get('dbPort'),
      username: configService.get('username'),
      password: configService.get('password'),
      database: configService.get('dbName'),
      entities: [User, Playlist, Artist, Song],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Playlist, Artist, Song],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions); //4
export default dataSource;
