import { Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

interface Rating {
  rate: number;
  count: number;
};

interface Item extends Product {
	product: Product;
	id: number;
}

@Component({
	selector: 'app-search',
	imports: [FormsModule],
	templateUrl: './search.html'
})

export class Search {
	query = signal('');		// Reactive search term signal bound to the input
results = httpResource<Item[]>(() => 'https://fakestoreapi.com/products/?q=ab');}
/*	results = httpResource<Item[]>(() => {	// httpResource automatically tracks the query signal and re-fetches
		const term = this.query().trim();
		return term ? `https://fakestoreapi.com/products/?q=${term}` : undefined;
	}, { defaultValue: [] });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/*
import { Component, signal, input, output, model, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DropdownOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-search',
	imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})

export class Search {
  // Array containing dropdown choices
  categories = [
    { name: 'men\'s' },
    { name: 'women\'s' },
    { name: 'electronics' }
  ];

 // The variable holding the full selected object
  selectedCategory = null;

  // Fires whenever the option shifts
  onChange(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const newValue = selectElement.value ? Number(selectElement.value) : null;
    
    // Update your model signal
    this.selectedId.set(newValue);
    
    console.log('Selected option changed to:', newValue);
    this.changeOption();
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectedId = model<number | null>(null);
	selectedOption = output<string>();
	changeOption(){this.selectedOption.emit('goodgood');}
  constructor(){
    effect(() => {console.log('The selectedId is: ', this.selectedId(), ' and\nThe options are: ', this.options());
			const currentValue: string | undefined = this.options().find(opt => opt.id === Number(this.selectedId()))?.name;
      this.handleSelectionChange(currentValue);
    });
  }
  private handleSelectionChange(value: string | undefined){
    console.log('Selected option name is: ', value);
    // Your custom business logic goes here
  }

  // Define options as a simple data array
  options = signal<DropdownOption[]>([
    { id: 1, name: 'Option Alpha' },
    { id: 2, name: 'Option Beta' },
    { id: 3, name: 'Option Gamma' }
  ]);
}*/