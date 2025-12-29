import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episodio } from './entities/episodio.entity';
import { Repository } from 'typeorm';
import { Serializer } from 'node:v8';
import { Series } from 'src/series/entities/series.entity';

@Injectable()
export class EpisodiosService {

  constructor(
      @InjectRepository(Episodio) private readonly episodioRepository: Repository<Episodio>,
      @InjectRepository(Series) private readonly serieRepository: Repository<Series>
    ) { }
  
  async create(createEpisodioDto: CreateEpisodioDto) {
    //return 'This action adds a new episodio';
   const serie = await this.serieRepository.findOneBy({ titulo: createEpisodioDto.tituloSerie})

    if (!serie) {
      throw new BadRequestException('Laserie no existe')
    }
    const episodio = this.episodioRepository.create({
      ...createEpisodioDto,
      serie
    })

    return await this.episodioRepository.save(episodio)
  }

  async findAll() {
    //return `This action returns all episodios`;
    return await this.episodioRepository
      .createQueryBuilder("episodio")
      .leftJoinAndSelect("episodio.serie", "serie")
      .select([
        'episodio.id',
        'episodio.titulo',
        'serie.titulo',
        'serie.genero'
      ])
      .getMany()
  }

  async findOne(id: number) {

    const episodio = await this.episodioRepository.findOne({
      where: { id },
      relations: ['series']
    })

    return episodio
    
  }

  update(id: number, updateEpisodioDto: UpdateEpisodioDto) {
    return `This action updates a #${id} episodio`;
  }

  async remove(id: number) {
    //return `This action removes a #${id} episodio`;
    const episodio = await this.episodioRepository.findOneBy({ id });

    if (!episodio) {
      throw new BadRequestException('El episodio no existe');
    }

    return await this.episodioRepository.delete(id)

  
  }
}
