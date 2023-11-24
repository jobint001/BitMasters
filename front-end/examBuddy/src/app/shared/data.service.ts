import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // This is a BehaviorSubject which will hold the current value of phrases
  private phrasesSubject = new BehaviorSubject<string[]>([]);
  
  // This is an observable that can be subscribed to get the latest phrases
  phrases$ = this.phrasesSubject.asObservable();

  constructor() { }

  // This method is used to update the phrases and it will
  // emit the new value to all subscribers
  updatePhrases(phrases: string[]) {
    this.phrasesSubject.next(phrases);
  }

  // This method would handle the file upload logic and would
  // be called from the FileUploadComponent
  uploadFile(file: File) {
    // The actual implementation would involve an HTTP request to the backend
    // Once the backend returns the response, you call updatePhrases with the data

    // The following is a mock implementation to simulate a backend response
    const mockPhrases = ['phrase 1', 'phrase 2', 'phrase 3', 'phrase 4', 'phrase 5'];
    setTimeout(() => {
      // This simulates receiving the phrases from the backend after a delay
      this.updatePhrases(mockPhrases);
    }, 2000);
  }
}
