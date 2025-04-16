import { Component, effect, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-fixed-deposit-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fixed-deposit-calculator.component.html',
  styleUrl: './fixed-deposit-calculator.component.css'
})
export class FixedDepositCalculatorComponent {
  principal = signal<number | null>(null);
  interestRate = signal<number | null>(null);
  tenure = signal<number | null>(null);
  frequency = signal<'monthly' | 'quarterly' | 'half-yearly' | 'yearly'>('yearly');
  startDate = signal<Date>(new Date());
  maturityAmount = signal<number | null>(null);
  maturityDate = signal<Date | null>(null);

  calculateMaturityDate(start: Date, tenureInMonths: number): Date {
    const newDate = new Date(start);
    newDate.setMonth(newDate.getMonth() + tenureInMonths);
    return newDate;
  }

  calculateFD(): void {
    const p = this.principal();
    const r = this.interestRate();
    const t = this.tenure();

    if (p === null || r === null || t === null || t <= 0) {
      this.maturityAmount.set(null);
      this.maturityDate.set(null);
      return;
    }

    const maturityDt = this.calculateMaturityDate(this.startDate(), t);
    this.maturityDate.set(maturityDt);

    let amount = 0;

    switch (this.frequency()) {
      case 'monthly':
        amount = p * Math.pow(1 + r / 100 / 12, t);
        break;
      case 'quarterly':
        amount = p * Math.pow(1 + r / 100 / 4, t / 3);
        break;
      case 'half-yearly':
        amount = p * Math.pow(1 + r / 100 / 2, t / 6);
        break;
      case 'yearly':
        amount = p * Math.pow(1 + r / 100, t / 12);
        break;
    }

    this.maturityAmount.set(amount);
  }

  formatDate(date: Date | null): string {
    return date ? format(date, 'PPP') : '';
  }

  updateStartDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.startDate.set(new Date(input.value));
    }
  }
}