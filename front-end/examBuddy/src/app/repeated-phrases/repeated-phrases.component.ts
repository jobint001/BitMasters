import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repeated-phrases',
  templateUrl: './repeated-phrases.component.html',
  styleUrls: ['./repeated-phrases.component.css']
})
export class RepeatedPhrasesComponent implements OnInit {
  @Input() phrases: string[] = []; // Initialize with an empty array

  constructor() { }

  ngOnInit(): void {
  }
}
