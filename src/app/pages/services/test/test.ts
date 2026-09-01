/*import { Component, signal, debounced } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  imports: [FormsModule],
  templateUrl: './test.html',
  styleUrl: './test.css',
})

export class Test {
	protected readonly limit = signal(20);
  protected readonly searchTerm = signal<string>('');
//  protected readonly debouncedQuery = debounced(this.searchQuery, 1000);
  protected updateQuery(query: string): void {
    this.searchTerm.set(query); console.log('The query is: ', this.searchTerm());
  }
}
*/
////////////////////////////////////////////////////////////////////////////////////////////
import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomDropdown } from './custom-dropdown';

interface DropdownOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-test',
  imports: [FormsModule, CustomDropdown],
  templateUrl: './test.html',
  styleUrl: './test.css',
})

export class Test {
  // Define options as a simple data array
  options = signal<DropdownOption[]>([
    { id: 1, name: 'Option Alpha' },
    { id: 2, name: 'Option Beta' },
    { id: 3, name: 'Option Gamma' }
  ]);

  // Track the selected ID using a Signal
  selectedId = signal<number | null>(null);

  // Compute the full selected object automatically based on the ID
  selectedItem = computed(() => {
    return this.options().find(item => item.id === this.selectedId()) || null;
  });

  // Handle manual change captures if side-effects are needed
  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    console.log('User manually picked ID:', target.value);
  }
}