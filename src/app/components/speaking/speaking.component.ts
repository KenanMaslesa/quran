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
  questionCounter = 1;
  showResults = false;
  isTestInProgress = false;
  maxTestQuestions = 1;
  questionNumber: number;
  showSpeechData = false;
  correctAnswersArray = [];
  wrongAnswersArray = [];
  wrongAnswersTestArray = [];
  isCurrentQuestionCorrect = false;
  phraseCategories;
  isDataLoaded = true;

  currentAyat = 1;
  currentSura = 1;
  constructor(
    private speechRecognitionService: SpeechRecognitionService,
    private quranService: QuranService
  ) {
    this.speechData = '';
    this.messages = '';
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  getAyat(postData: { sura: number; aya: number }) {
    this.isDataLoaded = false;
    this.currentAyat = postData.aya;
    this.currentSura = postData.sura;
    this.quranService
      .getAyat(postData.sura, postData.aya)
      .subscribe((responseData: { result }) => {
        this.isDataLoaded = true;
        this.ayat = responseData.result.text;
        this.phrases = responseData.result.simple;
        this.startTest();
      });
  }

  startTest(): void {
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.correctAnswersArray = [];
    this.wrongAnswersArray = [];

    this.questionNumber = this.getRandomNumber(0, this.phrases.length - 1);
    this.showSpeechData = false;
    this.isTestInProgress = true;
    this.showResults = false;
    this.isCurrentQuestionCorrect = false;

    this.speechRecognitionService.record().subscribe(
      (value) => {
        this.speechData = value;
        this.speechRecognitionService.DestroySpeechObject();
        this.showSpeechData = true;

        var speechValue = value.split(' ')
        .join('');
        var valueFromAPI = this.phrases
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

        if (valueFromAPI == speechValue) {
          this.correctAnswers++;
          this.isCurrentQuestionCorrect = true;
          this.correctAnswersArray.push(
            this.phrases + ' -> vaš odgovor: ' + value
          );
          var data = {
            sura: this.currentSura,
            aya: this.currentAyat+1
          }
          this.getAyat(data)
        } 
        else {
          this.wrongAnswers++;
          this.wrongAnswersArray.push(
            valueFromAPI + ' -> vaš NEodgovor: ' + speechValue
          );

          setTimeout(() => {
            this.showResults = true;
            this.isTestInProgress = false;
            this.questionCounter = 1;
            this.wrongAnswersTestArray.push(this.phrases[this.questionNumber]);
          }, 3000);
        }

        if (this.questionCounter < this.maxTestQuestions) {
          setTimeout(() => {
            this.repeatTest();
            this.questionCounter++;
          }, 3000);
        } else {
          // Test is finish here
          setTimeout(() => {
            //this.showResults = true;
            //this.isTestInProgress = false;
            //this.questionCounter = 1;
          }, 2000);
        }
      },
      (err) => {
        console.log(err);
        if (err.error == 'no-speech') {
          this.messages = 'no speech, please say something!';
          this.speechData = 'no speech, please say something!';
          this.speechRecognitionService.DestroySpeechObject();
          this.showSpeechData = true;
          this.questionCounter++;
          this.wrongAnswers++;
          this.repeatTest();
        }
      },
      () => {
        //alert('completed');
      }
    );
  }

  repeatTest() {}

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  removeSpecificStrings(text) {
    if (text == undefined) return;

    /*return text
      .toLowerCase()
      .split('ِ')
      .join('')
      .split('')
      .join('')
      .split('ٓ')
      .join('')
      .split('ٰ')
      .join('')
      .split('ْ')
      .join('')
      .split('ٍ')
      .join('')
      .split('')
      .join('')
      .split('')
      .join('')
      .split('')
      .join('')
      .split('ٲ')
      .join('');*/

    return text
      .toLowerCase()
      .split('\u064b')
      .join('')
      .split('\u064f')
      .join('')
      .split('\u064c')
      .join('')
      .split('\u0652')
      .join('')
      .split('\u064d')
      .join('')
      .split('\u0650')
      .join('')
      .split('\u0651')
      .join('')
      .split('\u064e')
      .join('')
      .split('ٲ')
      .join('');
  }

  wrongAnswersTest() {
    console.log(this.wrongAnswersTestArray);
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    //this.phrases = this.wrongAnswersTestArray;
    this.repeatTest();
  }
}
