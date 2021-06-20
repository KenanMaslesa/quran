import { Component, OnInit } from '@angular/core';
import { QuranService } from 'src/app/services/quran/quran.service';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition/speech-recognition.service';

@Component({
  selector: 'app-speaking',
  templateUrl: './speaking.component.html',
  styleUrls: ['./speaking.component.scss'],
})
export class SpeakingComponent implements OnInit {
  phrases; //
  ayat;
  speechData: string;
  messages: string;
  correctAnswers = 0;
  wrongAnswers = 0;
  questionCounter = 0;
  showResults = false;
  isTestInProgress = false;
  questionNumber: number;
  showSpeechData = false;
  correctAnswersArray = [];
  wrongAnswersArray = [];
  wrongAnswersTestArray = [];
  isCurrentQuestionCorrect = false;
  phraseCategories;
  isDataLoaded = true;
  testIsFinished = false;
  listOfSura;
  numberOfAyats: number;
  numberOfImages;
  indexOfAyahInQuran: number;

  currentAyat = 1;
  currentSura = 1;
  constructor(
    private speechRecognitionService: SpeechRecognitionService,
    private quranService: QuranService
  ) {
    this.speechData = '';
    this.messages = '';
  }

  ngOnInit(): void {
    this.getListOfSura();
  }

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  onFormSubmit(postData: {
    sura: { ayas: number; index: number };
    ayat: number;
  }) {
    this.currentAyat = postData.ayat;
    this.currentSura = Number(postData.sura.index);
    this.numberOfAyats = Number(postData.sura.ayas);
    this.numberOfImages = new Array(this.numberOfAyats);
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.correctAnswersArray = [];
    this.wrongAnswersArray = [];
    this.questionCounter = 0;

    this.getAyat(this.currentSura, this.currentAyat);
  }

  getAyat(sura, ayat) {
    this.isDataLoaded = false;

    this.quranService
      .getAyat(sura, ayat)
      .subscribe((responseData: { result }) => {
        this.isDataLoaded = true;
        this.indexOfAyahInQuran = Number(responseData.result.index);
        this.ayat = responseData.result.text;
        this.phrases = responseData.result.simple;
        this.questionCounter++;
        this.startTest();
      });
  }

  getListOfSura() {
    this.quranService
      .getListOfSura()
      .subscribe((responseData) => (this.listOfSura = responseData));
  }

  startTest(): void {
    this.showSpeechData = false;
    this.isTestInProgress = true;
    this.showResults = false;
    this.isCurrentQuestionCorrect = null;

    this.speechRecognitionService.record().subscribe(
      (value) => {
        this.speechData = value;
        this.speechRecognitionService.DestroySpeechObject();
        this.showSpeechData = true;

        var speechValue = value.split(' ').join('');
        var valueFromAPI = this.removeHarekah(this.phrases);

        if (valueFromAPI == speechValue) {
          this.correctAnswers++;
          this.isCurrentQuestionCorrect = true;

          setTimeout(() => {
            this.nextAyat();
          }, 1000);
        } 
        else {
          this.wrongAnswers++;
          this.wrongAnswersArray.push(
            'Ajet: ' + this.phrases + ' -> vaš odgovor: ' + value
          );
        }
      },
      (err) => {
        alert(err.error);
        if (err.error == 'no-speech') {
          this.messages = 'no speech, please say something!';
          this.speechData = 'no speech, please say something!';
          this.speechRecognitionService.DestroySpeechObject();
          this.showSpeechData = true;
          this.questionCounter++;
          this.wrongAnswers++;
        }
      },
      () => {
        //alert('completed');
      }
    );
  }

  wrongAnswersTest() {
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    //this.phrases = this.wrongAnswersTestArray;
  }

  removeHarekah(text) {
    return text
      .split('أ')
      .join('ا')
      .split('إ')
      .join('ا')
      .split('لآ')
      .join('لا')
      .split('ة')
      .join('ه')
      .split('آ')
      .join('ا')
      .split(' ')
      .join('');
  }

  finsihTest() {
    this.testIsFinished = true;
    this.showResults = true;
    this.isTestInProgress = false;
    this.speechRecognitionService.DestroySpeechObject();
  }

  nextAyat() {
    this.currentAyat++;

    if (this.currentAyat > this.numberOfAyats) {
      this.finsihTest();
    } 
    else {
      this.getAyat(this.currentSura, this.currentAyat);
    }
  }

  repeatAyat() {
    this.getAyat(this.currentSura, this.currentAyat);
  }
}
