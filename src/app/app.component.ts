import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

import { User } from './Model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  agGridApi!: GridApi;
  columnApi: any;

  columnDefs: ColDef[] = [
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

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  rowData: User[] = [];

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onGridReady(params: GridReadyEvent): void {
    this.agGridApi = params.api;
    this.columnApi = params.columnApi;

    this._httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
      this.rowData = data;
    });
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  updateRow(): void {
    const rowNode = this.agGridApi.getRowNode('0');
    rowNode?.setData({
      id: 99,
      name: 'El Mehdi REHOUMI',
      username: 'emrehoumi',
      email: 'em@karina.biz',
    });
  }

  updateCell(): void {
    const rowNode = this.agGridApi.getRowNode('0');
    rowNode?.setDataValue('id', 55);
  }

  updateAllRow(): void {
    this._httpClient.get<any>('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
      this.agGridApi.setRowData([]);
      this.agGridApi.applyTransaction({ add: data });
    });
  }

  clearDataGrid(): void {
    this.agGridApi.setRowData([]);
  }
}
