import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuranService {

  constructor(private http: HttpClient) { }
  //http://api.quran.com/api/v3/chapters/2/verses/2
  //http://quranapi.azurewebsites.net/api/chapter/2?startVerse=2&endVerse=2
//https://salamquran.com/en/api/v6/sura?index=2&start=10&limit=1
  getAyat(sura,aya){
    return this.http.get(`https://salamquran.com/en/api/v6/sura?index=${sura}&start=${aya}&limit=1`).pipe();
  }
}
