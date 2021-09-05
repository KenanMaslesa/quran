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
  page = 1;
  constructor(private quranService: QuranService) { }

  ngOnInit(): void {
    this.getChapters();
    this.getChapterWords(this.chapterNumber);
    this.getChapterDetails(this.chapterNumber);
    this.getSuraWordsByPage(this.page);

  }

  onSuraChanged(number){
    this.getSuraWordsByPage(number);
  }

  getSuraWordsByPage(page){
    this.quranService.getSuraWords(page).subscribe(response => {
      this.words = response;
    })
  }

  changePage(page){
    this.page = page;
    this.getSuraWordsByPage(page);
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

  playWord(url){
    var audioUrl = 'https://dl.salamquran.com/wbw/';
    audioUrl += url;
    var audio = new Audio(audioUrl);
    audio.play();
  }

  playAyat(url, ayaId){
    this.manageActiveClassesOfAyats(ayaId, 'add');

    var audio = new Audio(url);
    audio.play();
  
    var self = this;
    audio.onended = function() {
         self.manageActiveClassesOfAyats(ayaId, 'remove');
  };
  }

  manageActiveClassesOfAyats(ayaId, action){
    var activeAyats = document.querySelectorAll('.aya'+ayaId);
    activeAyats.forEach(aya => {
      if(action == 'add'){
        aya.classList.add('active');
      }
      else if(action == 'remove'){
        aya.classList.remove('active');
      }
      else if(action == 'mouseover'){
        aya.classList.add('hover');
      }
      else if(action == 'mouseleave'){
        aya.classList.remove('hover');
      }
    });
  }

 
}
