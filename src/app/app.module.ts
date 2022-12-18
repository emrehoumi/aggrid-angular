import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { CellCustomComponent } from './components/cell-custom/cell-custom.component';
import { ActionsComponent } from './components/actions/actions.component';

@NgModule({
  declarations: [AppComponent, CellCustomComponent, ActionsComponent],
  imports: [BrowserModule, HttpClientModule, AgGridModule],
  entryComponents: [CellCustomComponent, ActionsComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
