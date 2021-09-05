import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { quranResponseData } from 'src/app/models/quran.model';

@Injectable({
  providedIn: 'root'
})
export class QuranService {
  quranApi = "https://api.quran.com/api/v4";
//https://salamquran.com/api/v6/doc
  constructor(private http: HttpClient) { }
  getAyat(sura,ayat){
    return this.http.get(`https://salamquran.com/en/api/v6/sura?index=${sura}&start=${ayat}&limit=1`).pipe();
  }

  getSura(sura){
    return this.http.get(`https://salamquran.com/en/api/v6/sura?index=${sura}`).pipe();
  }

  getSuraWordsByPage(page){
    return this.http.get(`https://salamquran.com/en/api/v6/page/wbw?index=${page}`).pipe();
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

  getChapters(){ //sure
    return this.http.get(`${this.quranApi}/chapters?language=en`).pipe();
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
}
