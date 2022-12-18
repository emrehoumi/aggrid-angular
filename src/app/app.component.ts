import { Component, ViewChild, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, RowNodeTransaction } from 'ag-grid-community';

import { User } from './models/User';
import { CellCustomComponent } from './components/cell-custom/cell-custom.component';
import { ActionsComponent } from './components/actions/actions.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  agGridApi!: GridApi;
  columnApi!: ColumnApi;
  rowData: User[] = [];

  gridOptions: GridOptions = {
    context: { componentParent: this, value: 'CustomValue' },
  };

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', sortable: true },
    { headerName: 'Username', field: 'username', sortable: true },
    { headerName: 'Email', field: 'email', sortable: true },
    { headerName: 'Website', field: 'website', cellRenderer: CellCustomComponent },
    { headerName: '', field: '', cellRenderer: ActionsComponent },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    filter: true,
  };

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  onGridReady(params: GridReadyEvent): void {
    this.agGridApi = params.api;
    this.columnApi = params.columnApi;

    this._apiService.getUsers().subscribe((data) => {
      this.rowData = data;
    });
  }

  onCellClicked(e: CellClickedEvent): void {
    // console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  updateRow(): void {
    const rowNode = this.agGridApi.getRowNode('0');
    rowNode?.setData({
      name: 'El Mehdi REHOUMI',
      username: 'emrehoumi',
      email: 'em@karina.biz',
      website: 'denaehasia.net',
    });
  }

  updateCell(): void {
    const rowNode = this.agGridApi.getRowNode('0');
    rowNode?.setDataValue('name', 'New Name');
  }

  addRows(): void {
    this._apiService.getUsers().subscribe((data) => {
      this.agGridApi.setRowData([]);
      this.agGridApi.applyTransaction({ add: data });
    });
  }

  clearDataGrid(): void {
    this.agGridApi.setRowData([]);
  }

  add2Rows(addIndex?: number) {
    const newItems = [
      {
        name: 'Max',
        username: 'Max',
        email: 'max@karina.biz',
        website: 'anastasia.net',
      },
      {
        name: 'Min',
        username: 'Min',
        email: 'max@karina.biz',
        website: 'yoamtasia.net',
      },
    ];
    const res = this.agGridApi.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    })!;
    this.printResult(res);
  }

  updateRowCells() {
    // update the first 2 items
    const itemsToUpdate: any[] = [];
    this.agGridApi.forEachNodeAfterFilterAndSort((rowNode, index) => {
      // only do first 2
      if (index >= 2) {
        return;
      }
      const data = rowNode.data;
      data.username = 'Unknown';
      itemsToUpdate.push(data);
    });
    const res = this.agGridApi.applyTransaction({ update: itemsToUpdate })!;
    this.printResult(res);
  }

  editRow(data: any[]): void {
    this.agGridApi.applyTransaction({ update: data });
  }

  removeRow(data: any[]): void {
    this.agGridApi.applyTransaction({ remove: data });
  }

  onRemoveSelected() {
    const selectedData = this.agGridApi.getSelectedRows();
    const res = this.agGridApi.applyTransaction({ remove: selectedData })!;
    this.printResult(res);
  }

  private printResult(res: RowNodeTransaction) {
    console.log('---------------------------------------');
    if (res.add) {
      res.add.forEach((rowNode) => console.log('Added Row Node', rowNode));
    }
    if (res.remove) {
      res.remove.forEach((rowNode) => console.log('Removed Row Node', rowNode));
    }
    if (res.update) {
      res.update.forEach((rowNode) => console.log('Updated Row Node', rowNode));
    }
  }
}
