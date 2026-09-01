import { Component, model, input, output, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-dropdown',
  imports: [FormsModule], // Required for [(ngModel)]
  templateUrl: './custom-dropdown.html'
})

export class CustomDropdown {
  // 1. Rename to avoid template/output naming collision with standard conventions if needed
  // This exposes an implicit input 'customSelectedId' and output 'customSelectedIdChange'
  customSelectedId = model<number | null>(null);
  
  // Example options input signal
  options = input<{ id: number; name: string }[]>([]);
	SelectedOption = output
  constructor(){    // 2. Eliminate (change) by reacting to the model signal directly
    effect(() => {console.log('The selectedId is: ', this.customSelectedId(), ' and\nThe options are: ', this.options());
			const currentValue: string | undefined = this.options().find(opt => opt.id === Number(this.customSelectedId()))?.name;
      this.handleSelectionChange(currentValue);
    });
  }

  private handleSelectionChange(value: string | undefined){
    console.log('Selected option name is: ', value);
    // Your custom business logic goes here
  }
}
