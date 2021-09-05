import { Component, OnInit } from '@angular/core';
import { QuranService } from 'src/app/services/quran/quran.service';

@Component({
  selector: 'app-quran',
  templateUrl: './quran.component.html',
  styleUrls: ['./quran.component.scss'],
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
  suraTitle = '';
  audio;
  previousAyah;
  constructor(private quranService: QuranService) {}

  ngOnInit(): void {
    this.getChapters();
    this.getChapterWords(this.chapterNumber);
    this.getChapterDetails(this.chapterNumber);
    this.getSuraWordsByPage(this.page);
  }

  onSuraChanged(number) {
    this.getSuraWordsByPage(number);
  }

  setSuraTitle(title: string) {
    if (title.indexOf('undefined') > -1) {
      return this.suraTitle;
    } else {
      return (this.suraTitle = title);
    }
  }

  getSuraWordsByPage(page) {
    this.quranService.getSuraWordsByPage(page).subscribe((response) => {
      this.words = response;
      this.setCurrentPage(response);
      this.getAudioOfAyah(1,1);
    });
  }

  setCurrentPage(list) {
    var temPage;
    list.result.forEach((element) => {
      temPage = Number(element.detail.page);
      if (temPage > 0) {
        this.page = temPage;
        return;
      }
    });
  }
  changePage(page) {
    this.page = page;
    this.getSuraWordsByPage(page);
  }

  getChapters() {
    this.quranService.getChapters().subscribe((responseData) => {
      this.chapters = responseData;
    });
  }

  getChapterDetails(chapterNumber) {
    this.quranService
      .getChapterDetails(chapterNumber)
      .subscribe((responseData) => {
        this.chapterDetails = responseData;
      });
  }

  getChapterWords(chapterNumber) {
    this.quranService
      .getChapterWords(chapterNumber, this.currentPage)
      .subscribe((responseData) => (this.chapterWords = responseData));
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

  playAyat(url, ayah, ayahID) {
    if (this.audio) {
      if (!this.audio.paused) {
        this.audio.pause();
        this.manageClassesOfAyats(this.previousAyah, 'remove');
      }
    }
    var audio = new Audio(url.audio);
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
      ayahID = ayahID.substring(0,ayahID.indexOf("-"));
      ayahID = ayahID + '-' + ayah;
      audio.src = self.getAudioOfAyah(ayah, ayahID);
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

  getAudioOfAyah(number, v) {
    var stringNumber = String(number);
    var url = '';
    var verse = v.replace('-', ':');
    this.words.result.forEach((ayah) => {
      if(ayah.word){
        ayah.word.forEach(element => {
          if (element.verse_key == verse) {
            url = element.audio;
          }
        });
      }
      
    });
    return url;
  }
}
