import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  files: File[] = [];

  onFileDropped(event: CdkDragDrop<File[]>) {
    for (let i = 0; i < event.item.data.length; i++) {
      this.files.push(event.item.data[i]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    Array.from(input.files).forEach(file => this.files.push(file));
  }

  deleteFile(index: number): void {
    this.files.splice(index, 1);
  }
}
