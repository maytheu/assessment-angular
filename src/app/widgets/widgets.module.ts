import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExceptionPipe } from './exception.pipe';

@NgModule({
  declarations: [InputComponent, ExceptionPipe],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, ExceptionPipe],
})
export class WidgetsModule {}
