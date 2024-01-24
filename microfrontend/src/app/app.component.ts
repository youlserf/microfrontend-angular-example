import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Microfrontend</h1>
    <div>
      <p>Data received from main app:</p>
      <pre>{{ receivedData | json }}</pre>
    </div>
  `,
})
export class AppComponent implements OnInit {
  receivedData: any;

  ngOnInit() {
    window.addEventListener('message', this.handleMessage);
  }

  private handleMessage = (event: MessageEvent) => {
    if (event.origin === 'http://localhost:4200') {
      this.receivedData = event.data;
      console.log('Received data:', this.receivedData);
      // Handle the received data here
    }
  };
}
