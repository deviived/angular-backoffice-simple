import { Component, input, computed } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PercentPipe } from '@angular/common';

export interface MovieData {
  id: number;
  name: string;
  rating?: number;
  year: number;
  director: string;
}

const MOVIES_DATA: MovieData[] = [
  { id: 1, name: 'Dune 2', rating: 3.94, year: 2023, director: 'Denis Villeneuve' },
  { id: 2, name: 'Matrix 2', rating: 4.33, year: 2001, director: 'Wachovski' },
];

const MOVIES_DATA2: MovieData[] = [
  { id: 3, name: 'Pulp Fiction', rating: 4.85, year: 2002, director: 'Quentin Tarantino' },
  { id: 4, name: 'Shutter Island', year: 2010, director: 'Martin Scorcese' },
  { id: 5, name: 'Akira', rating: 4.96, year: 1988, director: 'Katsuhiro Ōtomo' },
];

const MOVIES_DATA3: MovieData[] = [
  { id: 6, name: 'Snatch', rating: 4.88, year: 2000, director: 'Guy Ritchie' },
  { id: 7, name: 'Attrape moi si tu peux', year: 2002, director: 'Steven Spielberg' },
];

@Component({
  selector: 'app-table-movies',
  imports: [MatTableModule, PercentPipe],
  templateUrl: './table-movies.component.html',
  styleUrl: './table-movies.component.scss',
})
export class TableMoviesComponent {
  category = input.required<string>();
  displayedColumns: string[] = ['name', 'year', 'director', 'rating'];
  dataSource = computed(() => {
    switch(this.category()) {
      case 'thriller':
        return MOVIES_DATA;
      case 'western':
        return MOVIES_DATA2;
      default:
        return MOVIES_DATA3;
    }
  });
  
}
