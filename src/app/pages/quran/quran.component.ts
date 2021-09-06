import { Component, OnInit } from '@angular/core';
import { QuranService } from 'src/app/services/quran/quran.service';

@Component({
  selector: 'app-quran',
  templateUrl: './quran.component.html',
  styleUrls: ['./quran.component.scss']
})
export class QuranComponent implements OnInit {

  constructor(public quranService: QuranService) { }

  ngOnInit(): void {
    this.quranService.getSuraWordsByPage(1, 2);
    this.quranService.getSuraWordsByPage(1, 1);
  }

}
