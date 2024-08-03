import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { CommonModule } from '@angular/common';

import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
  providers: [MessageService, ConfirmationService, AppointmentService],
  imports: [CommonModule, TableModule, DialogModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, FormsModule],
})
export class AppointmentListComponent implements OnInit {
  productDialog: boolean = false;
  appointments!: Appointment[];
  error: string | null = null;
  appointment!: Appointment;
  selectedProducts!: Appointment[] | null;
  submitted: boolean = false;

  constructor(private appointmentService: AppointmentService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loadAppointments();
  }

  openNew() {
    this.appointment = {};
    this.submitted = false;
    this.productDialog = true;
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.error = null;
      },
      error: (err) => {
        console.error('Failed to load appointments:', err);
        this.error = 'Failed to load appointments. Please try again later.';
      }
    });
  }

  saveAppointment() {
    this.submitted = true;

    if (this.appointment.customerName?.trim()) {
      if (this.appointment.id) {
        this.appointmentService.updateAppointment(this.appointment).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Updated', life: 3000 });
            this.loadAppointments();
          },
          error: (err) => {
            console.error('Failed to update appointment:', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update appointment', life: 3000 });
          }
        });
      } else {
        this.appointment.id = this.createId();
        this.appointmentService.addAppointment(this.appointment).subscribe({
          next: (newAppointment) => {
            this.appointments.push(newAppointment);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Created', life: 3000 });
          },
          error: (err) => {
            console.error('Failed to add appointment:', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add appointment', life: 3000 });
          }
        });
      }

      this.appointments = [...this.appointments];
      this.productDialog = false;
      this.appointment = {};
    }
  }

  editAppointment(appointment: Appointment) {
    this.appointment = { ...appointment };
    this.productDialog = true;
  }

  deleteAppointment(appointment: Appointment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + appointment.customerName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appointments = this.appointments.filter((val) => val.id !== appointment.id);
        this.appointmentService.deleteAppointment(appointment.id as string).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Deleted', life: 3000 });
            this.loadAppointments();
          },
          error: (err) => {
            console.error('Failed to delete appointment:', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete appointment', life: 3000 });
          }
        });
      }
    });
  }

  deleteSelectedAppointment() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected appointments?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appointments = this.appointments.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts?.forEach((appointment) => {
          this.appointmentService.deleteAppointment(appointment.id as string).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Deleted', life: 3000 });
              this.loadAppointments();
            },
            error: (err) => {
              console.error('Failed to delete appointment:', err);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete appointment', life: 3000 });
            }
          });
        });
        this.selectedProducts = null;
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  
  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
