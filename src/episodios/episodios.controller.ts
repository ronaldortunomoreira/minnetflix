import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EpisodiosService } from './episodios.service';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('episodios')
export class EpisodiosController {
  constructor(private readonly episodiosService: EpisodiosService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createEpisodioDto: CreateEpisodioDto) {
    return this.episodiosService.create(createEpisodioDto);
  }

  @Get()
  findAll() {
    return this.episodiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodiosService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpisodioDto: UpdateEpisodioDto) {
    return this.episodiosService.update(+id, updateEpisodioDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodiosService.remove(+id);
  }
}
