import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { QuranService } from 'src/app/services/quran/quran.service';

@Component({
  selector: 'app-ruqyah',
  templateUrl: './ruqyah.component.html',
  styleUrls: ['./ruqyah.component.scss']
})
export class RuqyahComponent implements OnInit {
  ayah: any;
  index: any;
  constructor(public quranService: QuranService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  playAyat(suraNumber, ayatNumber){
    this.quranService.getAyat(suraNumber, ayatNumber).subscribe(response => {
      this.play(response);
    })
  }

  play(response){
    var audio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${response.result.index}.mp3`);
    audio.play();
  }


}


