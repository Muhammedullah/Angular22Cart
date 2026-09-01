import { Component, inject } from '@angular/core';
import { Icon } from './icon/icon';
import { Test } from './test/test';

@Component({
  selector: 'app-services',
	imports: [Icon, Test],
  templateUrl: './services.html',
  styleUrl: './services.css'
})

export default class Services {
	public isVisible = true;
}