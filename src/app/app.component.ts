import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppointmentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'appointment-app';
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
} 