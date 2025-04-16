
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FixedDepositCalculatorComponent } from './fixed-deposit-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FixedDepositCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fixed-deposit-calculator';
}
