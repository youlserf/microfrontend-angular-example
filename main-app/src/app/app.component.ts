import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Main App</h1>
    <button (click)="openMicrofrontend()">Open Microfrontend</button>
    <div #microfrontendContainer></div>
  `,
})
export class AppComponent {
  @ViewChild('microfrontendContainer', { static: true }) microfrontendContainer!: ElementRef;

  openMicrofrontend() {
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:4201';
    iframe.width = '600';
    iframe.height = '400';

    // Append the iframe to the container
    this.microfrontendContainer.nativeElement.appendChild(iframe);

    // Wait for the iframe to load before sending a message
    iframe.addEventListener('load', () => {
      const dataToSend = {
        message: 'Hello from main app!',
        files: ['file1.txt', 'file2.jpg'],
        // Add any other data you want to send
      };
      console.log('Sending:', dataToSend);

      // Access the contentWindow of the iframe to post a message
      iframe.contentWindow?.postMessage({ action: 'openModal', data: dataToSend }, 'http://localhost:4201');
    });
  }
}
