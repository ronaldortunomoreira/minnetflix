import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from './entities/series.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService {

  constructor(
    @InjectRepository(Series) private readonly seriesRepository: Repository<Series>
  ) { }

  async create(createSerieDto: CreateSeriesDto) {
    const serie = this.seriesRepository.create(createSerieDto);
    return await this.seriesRepository.save(serie);
  }

  async findAll() {
    return await this.seriesRepository.find();
  }

  async findOne(id: number) {
    //return `This action returns a #${id} series`;
    return await this.seriesRepository.findOne({
      where: { id },
      relations: ["episodios"]
    });
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return await this.seriesRepository.update(id, updateSeriesDto);
  }
  
  async remove(id: number) {
    return await this.seriesRepository.delete(id)
  }
}
