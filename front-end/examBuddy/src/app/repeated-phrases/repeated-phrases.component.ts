import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-repeated-phrases',
  templateUrl: './repeated-phrases.component.html',
  styleUrls: ['./repeated-phrases.component.css'],
})
export class RepeatedPhrasesComponent implements OnInit {
  phrases: string[][] = []; // Array of arrays to hold split lines

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.phrases$.subscribe((phrasesArray: string[]) => {
      this.phrases = phrasesArray.map((phrase) => phrase.split('\\n'));
    });
  }
}
