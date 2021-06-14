import { Component, OnInit } from '@angular/core';
import { QuranService } from 'src/app/services/quran/quran.service';

@Component({
  selector: 'app-quran',
  templateUrl: './quran.component.html',
  styleUrls: ['./quran.component.scss']
})
export class QuranComponent implements OnInit {
  indexOfAyahInQuran;
  sura;
  listOfSura;
  numberOfAyats = new Array(Number(7));
  currentSura = 1;
  constructor(private quranService: QuranService) { }

  ngOnInit(): void {
    this.getListOfSura();
    this.getAyat(1,1);
  }

  getAyat(sura, ayat){
    this.quranService
    .getAyat(sura, ayat)
    .subscribe((responseData: { result }) => {
      this.sura = responseData;
      this.indexOfAyahInQuran = Number(responseData.result.index);
    });
  }

  onSuraChanged(number){
    this.indexOfAyahInQuran = null;
    var ayas = number.split("|")[0];
    var index = number.split("|")[1];
    this.numberOfAyats = new Array(Number(ayas));
    this.currentSura = Number(index);
    this.getAyat(this.currentSura, 1);
  }

  getListOfSura(){
    this.quranService.getListOfSura().subscribe(responseData => {
      this.listOfSura = responseData
    });
  }

  playAyat(ayat){
    if(ayat == undefined) return;

    var audio, audioPath = 'https://cdn.islamic.network/quran/audio/64/ar.alafasy/';
    audioPath += ayat +'.mp3';
    audio = new Audio(audioPath);
    audio.play();
  }

}
