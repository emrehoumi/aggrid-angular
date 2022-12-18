import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  params!: ICellRendererParams;

  constructor() {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  edit(): void {
    const data = this.params.node.data;
    data.name = 'edited name';
    this.params.context.componentParent.editRow([data]);
  }

  remove(): void {
    this.params.context.componentParent.removeRow([this.params.node.data]);
  }
}
