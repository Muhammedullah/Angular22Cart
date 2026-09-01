import { Component, signal, VERSION } from '@angular/core';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-angular',
  imports: [KeyValuePipe],
  templateUrl: './angular.html',
  styleUrl: './angular.css'
})

export default class Angular {
	protected readonly version = VERSION;
	protected readonly title = signal('Angular');
	protected readonly items = [
		{ title: 'Explore the Docs', 									link: 'https://angular.dev' },
		{ title: 'Learn with Tutorials', 							link: 'https://angular.dev/tutorials' },
		{ title: 'Prompt and best practices for AI', 	link: 'https://angular.dev/ai/develop-with-ai'},
		{ title: 'CLI Docs', 													link: 'https://angular.dev/tools/cli' },
		{ title: 'Angular Language Service', 					link: 'https://angular.dev/tools/language-service' },
		{ title: 'Angular DevTools', 									link: 'https://angular.dev/tools/devtools' }
	];
}