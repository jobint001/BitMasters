import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-repeated-phrases',
  templateUrl: './repeated-phrases.component.html',
  styleUrls: ['./repeated-phrases.component.css']
})
export class RepeatedPhrasesComponent implements OnInit {
  phrases: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.phrases$.subscribe((phrases) => {
      this.phrases = phrases;
    });
  }
}