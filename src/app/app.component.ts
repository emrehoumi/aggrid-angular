import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './Model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  agGridApi!: GridApi;
  columnApi: any;

  public columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
    },
    {
      headerName: 'Name',
      field: 'name',
    },
    {
      headerName: 'Username',
      field: 'username',
    },
    {
      headerName: 'Email',
      field: 'email',
    },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<User[]>;

  constructor(private _httpClient: HttpClient) {}

  onGridReady(params: GridReadyEvent): void {
    this.rowData$ = this._httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
