import { Injectable } from '@angular/core';
import * as data from '../data/nvi.json';
import { BiblicalReference } from '../models/biblical-reference';

@Injectable({
  providedIn: 'root'
})
export class BibleService {

  private bible: any;

  constructor() {
    this.bible = (data as any).default;
  }

  private randomNumber(min, max): number {
    return Math.floor(Math.random() * max) + min;
  }

  getRandomBiblicalReference(): BiblicalReference {
    const bookNumber: number = this.randomNumber(1, 66);
    const book = this.bible[bookNumber - 1];

    const chapterNumber: number = this.randomNumber(1, book.chapters.length);
    const chapter = book.chapters[chapterNumber - 1];

    const verseNumber: number = this.randomNumber(1, chapter.length);
    const verse = chapter[verseNumber - 1];

    return new BiblicalReference(book.name, chapterNumber.toString(), verseNumber.toString(), verse);
  }
}
