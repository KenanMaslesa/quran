import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { QuranService } from 'src/app/services/quran/quran.service';

@Component({
  selector: 'app-ruqyah',
  templateUrl: './ruqyah.component.html',
  styleUrls: ['./ruqyah.component.scss']
})
export class RuqyahComponent implements OnInit {
  ayah: any;
  index: any;
  shortVersion = true;
  ruqya = true;
  zikr = false;
  quran = false;
  randomPage = 10;
  constructor(public quranService: QuranService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.randomPage = this.getRandomNumber();
    this.quranService.getSuraWordsByPage(this.randomPage, 1);
  }

  getRandomNumber(){
    return  Math.floor(Math.random() * (604 - 1 + 1)) + 1;//Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setRandomPage(){
    this.randomPage = this.getRandomNumber();
    this.quranService.getSuraWordsByPage(this.randomPage, 1);
  }

  playAyat(suraNumber, ayatNumber){
    this.quranService.getAyat(suraNumber, ayatNumber).subscribe(response => {
      this.play(response);
    })
  }

  play(response){
    var audio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${response.result.index}.mp3`);
    audio.play();
  }


}


