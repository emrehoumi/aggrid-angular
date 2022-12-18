import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-cell-custom',
  templateUrl: './cell-custom.component.html',
  styleUrls: ['./cell-custom.component.scss'],
})
export class CellCustomComponent {
  data!: string;
  params!: ICellRendererParams;

  constructor() {}

  agInit(params: ICellRendererParams): void {
    this.data = params.value;
    this.params = params;
  }

  execute(): void {
    this.params.context.componentParent.addRows();
    console.log(this.params.context.value);
  }
}
