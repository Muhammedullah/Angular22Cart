import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[app-icon]',
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})

export class Icon {
  name = input.required<string>();  // Use Angular Signals for fast, reactive input tracking
}