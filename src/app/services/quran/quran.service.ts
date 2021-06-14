import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { quranResponseData } from 'src/app/models/quran.model';

@Injectable({
  providedIn: 'root'
})
export class QuranService {

  constructor(private http: HttpClient) { }
  //http://api.quran.com/api/v3/chapters/2/verses/2
  //http://quranapi.azurewebsites.net/api/chapter/2?startVerse=2&endVerse=2
//https://salamquran.com/en/api/v6/sura?index=2&start=10&limit=1
  getAyat(sura,ayat){
    return this.http.get(`https://salamquran.com/en/api/v6/sura?index=${sura}&start=${ayat}&limit=1`).pipe();
  }

  getSura(sura){
    return this.http.get(`https://salamquran.com/en/api/v6/sura?index=${sura}`).pipe();
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
}
