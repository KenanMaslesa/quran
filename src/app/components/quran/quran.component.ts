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
  chapterNumber = 2;
  currentPage = 1;
  words;
  constructor(private quranService: QuranService) { }

  ngOnInit(): void {
    this.getChapters();
    this.getChapterWords(this.chapterNumber);
    this.getChapterDetails(this.chapterNumber);
    this.quranService.getSuraWords(1).subscribe(response => {
      this.words = response;
    })
  }

  onSuraChanged(number){
    this.quranService.getSuraWords(number).subscribe(response => {
      this.words = response;
    })
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
    this.quranService.getChapterWords(chapterNumber, this.currentPage).subscribe(responseData => this.chapterWords = responseData);
  }

  getPage(pageNumber){
    this.quranService.getPage(pageNumber).subscribe(responseData => this.chapterWords = responseData);
  }

  playAudio(url){
    var audioUrl = 'https://audio.qurancdn.com/';
    audioUrl = 'https://dl.salamquran.com/wbw/';
    audioUrl += url;
    var audio = new Audio(audioUrl);
    audio.play();
  }

 
}
