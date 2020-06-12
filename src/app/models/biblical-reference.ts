export class BiblicalReference {
    book: string;
    chapter: string;
    verse: string;
    text: string;

    constructor(book: string, chapter: string, verse: string, text: string) {
        this.book = book;
        this.chapter = chapter;
        this.verse = verse;
        this.text = text;
    }
}