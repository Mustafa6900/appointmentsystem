import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppointmentListComponent } from '../../components/appointment-list/appointment-list.component';


@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [FormsModule, SelectButtonModule, AppointmentListComponent],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {

  stateOptions = [
    { label: 'Randevu Listesi', value: 'Randevu Listesi' },
    { label: 'Yeni Randevu Ekle', value: 'Yeni Randevu Ekle' }
  ];
  selectedValue: any;
  value: any;

}
