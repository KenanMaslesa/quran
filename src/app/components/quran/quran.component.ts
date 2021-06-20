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
  chapters;
  chapterDetails;
  numberOfAyats = new Array(Number(7));
  currentSura = 1;
  chapterWords;
  chapterNumber = 1;
  constructor(private quranService: QuranService) { }

  ngOnInit(): void {
    this.getChapters();
    this.getChapterWords(this.chapterNumber);
    this.getChapterDetails(this.chapterNumber);
  }

  onSuraChanged(number){
    this.indexOfAyahInQuran = null;
    var numberOfAyats = number.split("|")[0];
    var index = number.split("|")[1];

    this.chapterNumber = index;
    this.getChapterWords(this.chapterNumber);
    this.getChapterDetails(this.chapterNumber);

    this.numberOfAyats = new Array(Number(numberOfAyats));
    this.currentSura = Number(index);
  }

  getChapters(){
    this.quranService.getChapters().subscribe(responseData => {
      this.chapters = responseData
    });
  }

  getChapterDetails(chapterNumber){
    this.quranService.getChapterDetails(chapterNumber).subscribe(responseData => {
      this.chapterDetails = responseData
    });
  }

  getChapterWords(chapterNumber){
    this.quranService.getChapterWords(chapterNumber).subscribe(responseData => this.chapterWords = responseData);
  }

  playAudio(url){
    var audioUrl = 'https://audio.qurancdn.com/';
    audioUrl += url;
    var audio = new Audio(audioUrl);
    audio.play();
  }

 
}
