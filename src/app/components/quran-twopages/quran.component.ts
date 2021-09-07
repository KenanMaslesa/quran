import { Component, OnInit } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { QuranService } from 'src/app/services/quran/quran.service';

@Component({
  selector: 'app-quran-twopages',
  templateUrl: './quran.component.html',
  styleUrls: ['./quran.component.scss'],
})
export class QuranTwoPagesComponent implements OnInit {
  indexOfAyahInQuran;
  sura;
  chapters;
  chapterDetails;
  numberOfAyats = new Array(Number(7));
  currentSura = 1;
  chapterWords;
  chapterNumber = 2;
  words;
  words2;
  suraTitle = '';
  audio;
  previousAyah;
  suraList;
  constructor(public quranService: QuranService) {}

  ngOnInit(): void {
    this.quranService.currentPage = Number(localStorage.getItem('page'))??1;
    this.quranService.getSuraWordsByPage(this.quranService.currentPage, 1);
    this.quranService.getSuraWordsByPage(this.quranService.currentPage + 1, 2);
  }


  setSuraTitle(title: string) {
    if (title.indexOf('undefined') > -1) {
      return this.suraTitle;
    } else {
      return (this.suraTitle = title);
    }
  }

 
  changePage(page) {
    this.quranService.currentPage = page;
    this.quranService.getSuraWordsByPage(page, 1);
    this.quranService.getSuraWordsByPage(page + 1, 2);
  }


  getPage(pageNumber) {
    this.quranService
      .getPage(pageNumber)
      .subscribe((responseData) => (this.chapterWords = responseData));
  }

  playWord(url) {
    var audioUrl = 'https://dl.salamquran.com/wbw/';
    audioUrl += url;
    var audio = new Audio(audioUrl);
    audio.play();
  }

  pauseAudio(){
    this.audio.pause();
  }

  resumeAudio(){
    this.audio.play();
  }
  playAyat(url, ayah, ayahID, page) {
 
    if (this.audio) {
      if (!this.audio.paused) {
        this.audio.pause();
        this.manageClassesOfAyats(this.previousAyah, 'remove');
      }
    }
    var audio = new Audio(this.quranService.changeQariUrl(url.audio));
    this.audio = audio;
    this.previousAyah = ayah;
    this.removeActiveClasses();
    ayahID = ayahID.replace('-' + '.*', '-' + ayah);
    this.manageClassesOfAyats(ayahID, 'add');
    audio.play();

    var self = this;
    audio.onended = function () {
      self.manageClassesOfAyats(ayahID, 'remove');
      ayah = Number(ayah) + 1;
      ayahID = ayahID.substring(0, ayahID.indexOf('-'));
      ayahID = ayahID + '-' + ayah;
      audio.src = self.getAudioOfAyah(ayah, ayahID, page);
      self.removeActiveClasses();
      self.manageClassesOfAyats(ayahID, 'add');
      audio.play();
    };
  }

  manageClassesOfAyats(ayaId, action) {
    ayaId = ayaId.replace(':', '-');
    var activeAyats = document.querySelectorAll('.aya' + ayaId);
    activeAyats.forEach((aya) => {
      if (action == 'add') {
        aya.classList.add('active');
      } else if (action == 'remove') {
        aya.classList.remove('active');
      } else if (action == 'mouseover') {
        aya.classList.add('hover');
      } else if (action == 'mouseleave') {
        aya.classList.remove('hover');
      }
    });
  }

  removeActiveClasses() {
    var activeAyats = document.querySelectorAll('.ayeLine i');
    activeAyats.forEach((aya) => {
      aya.classList.remove('active');
    });
  }

  getAudioOfAyah(number, v, page) {
    var url = '';
    var verse = v.replace('-', ':');
    if(Number(page) % 2 == 0){
      this.quranService.words2.result.forEach((ayah) => {
        if (ayah.word) {
          ayah.word.forEach((element) => {
            if (element.verse_key == verse) {
              debugger;
              url = element.audio;
            }
          });
        }
      });
    }
    else{
        this.quranService.words.result.forEach((ayah) => {
          if (ayah.word) {
            ayah.word.forEach((element) => {
              if (element.verse_key == verse) {
                url = element.audio;
              }
            });
          }
        });
    }
   
    return this.quranService.changeQariUrl(url);
  }

 
}
