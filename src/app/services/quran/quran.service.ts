import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { quranResponseData } from 'src/app/models/quran.model';

@Injectable({
  providedIn: 'root'
})
export class QuranService {
  quranApi = "https://api.quran.com/api/v4";
  onePageMode = false;
  translationMode = false;
  twoPagesMode = true;
  words: any;
  words2: any;
  showLoader = false;
  currentPage = Number(localStorage.getItem('page'))??1;
  qari = 'https://dl.salamquran.com/ayat/afasy-murattal-192/';
//https://salamquran.com/api/v6/doc
  constructor(private http: HttpClient) {
  
   }
  getAyat(sura,ayat){
    return this.http.get(`https://salamquran.com/en/api/v6/sura?index=${sura}&start=${ayat}&limit=1`).pipe();
  }

  getSura(sura){
    return this.http.get(`https://salamquran.com/en/api/v6/sura?index=${sura}`).pipe();
  }

  getSuraWordsByPage(page, list){

    this.showLoader = true;
     this.http.get(`https://salamquran.com/en/api/v6/page/wbw?index=${page}`).pipe().subscribe((response) => {
       if(list == 1){
         this.words = response;
        }
        else if(list == 2){
          this.words2 = response;
        }
        this.showLoader = false;
    });
  }

  getWordsBySura(sura){
    return this.http.get(`https://salamquran.com/en/api/v6/page/wbw?index=${sura}`);
  }
  getListOfSura(){
    return this.http.get(`https://salamquran.com/en/api/v6/sura/list`).pipe(map((responseData:quranResponseData) => {
      const suraArray = [];
      for (const key in responseData.result) {
          suraArray.push({ ...responseData.result[key]});
        }
        return suraArray;
      }
    ));
  }

  getAyah(number){
    return this.http.get(`https://salamquran.com/en/api/v6/aya?index=${number}`);
  }



  getChapters(){ //sure
    return this.http.get(`${this.quranApi}/chapters?language=en`).pipe();
  }

  changeQariUrl(url:string){
    return url.replace('https://dl.salamquran.com/ayat/afasy-murattal-192/', this.qari);
  }

  getChapterDetails(chapterNumber){
    return this.http.get(`${this.quranApi}/chapters/${chapterNumber}/info?language=en`).pipe();
  }

  getChapterWords(chapterNumber, page, recitationId = 7){
    return this.http.get(`${this.quranApi}/verses/by_chapter/${chapterNumber}?words=true&translations=126&audio=${recitationId}&page=3`).pipe();
  }

  getPage(pageNumber, recitationId = 7){
    return this.http.get(`${this.quranApi}/verses/by_page/${pageNumber}?language=en&words=true&translations=126&audio=${recitationId}`).pipe();
  }

  getRecitations(){
    return this.http.get(`${this.quranApi}/resources/recitations?language=en`).pipe();
  }

  bookmarkCurrentPage(){
    localStorage.setItem('page', String(this.currentPage));
  }


  setCurrentPage(list) {
    var temPage;
    list.result.forEach((element) => {
      temPage = Number(element.detail.page);
      if (temPage > 0) {
        this.currentPage = temPage;
        return;
      }
    });

    
  }
}
