import { Component, OnInit } from '@angular/core';
import { QuranService } from 'src/app/services/quran/quran.service';

@Component({
  selector: 'app-quran-header',
  templateUrl: './quran-header.component.html',
  styleUrls: ['./quran-header.component.scss']
})
export class QuranHeaderComponent implements OnInit {
  suraList: any;
  constructor(public quranService: QuranService) { }

  ngOnInit(): void {
    this.getSuraList();
  }

  getSuraList(){
    this.quranService.getListOfSura().subscribe(response => {
      this.suraList = response;
    })
  }

  onReadModeChanged(mode){
    if(mode == 1){
      this.quranService.onePageMode = true;
      this.quranService.twoPagesMode = false;
      this.quranService.translationMode = false;
    }
    else if(mode == 2){
      this.quranService.onePageMode = false;
      this.quranService.twoPagesMode = true;
      this.quranService.translationMode = false;
    }
    else if(mode == 3){
      this.quranService.onePageMode = false;
      this.quranService.twoPagesMode = false;
      this.quranService.translationMode = true;
    }
  }


  onSuraChanged(number) {
    this.quranService.currentPage = Number(number);
    this.quranService.getSuraWordsByPage(number, 1);
    this.quranService.getSuraWordsByPage(Number(number) + 1, 2);
  }

}
