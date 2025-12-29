import { Series } from "src/series/entities/series.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Episodio {
    
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    titulo: string;
    @Column()
    duracion: string;
    @Column()
    numeroCapitulo: number;

    @ManyToOne(()=>Series, serie => serie.episodios)
    serie:Series
}
