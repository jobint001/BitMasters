import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFiles: File[] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.selectedFiles = Array.from(input.files);
  }
  deleteFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }
  onFileDropped(event: any): void {
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  onUpload(): void {
    if (this.selectedFiles.length === 0) return;

    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    // Replace 'your-backend-url' with your actual Node.js backend URL.
    const uploadUrl = 'http://localhost:3000/uploadpdf';

    this.http.post(uploadUrl, formData).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }
}
