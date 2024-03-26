import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Model, ModelList } from '../service/model';
import { AppServiceService } from '../service/app-service.service';
import { Observable, Subject, catchError, of } from 'rxjs';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component {
  mainModel = {
    code: '',
    description: '',
  };
  colorModel = {
    code: '',
    description: '',
  };
  modelSelect: ModelList = { colors: [], code: '', description: '' };
  colorSelect: Model = { code: '', description: '', price: 0 };
  optionsSelected = false;
  imageUrl?: HTMLImageElement;
  selectedChoice?: boolean;
  image?: Blob;
  checkColor?: Model[];

  @Input() showComponent: boolean = false;
  @Output() btnDisable2 = new EventEmitter<boolean>();
  @Output() sendToApp = new EventEmitter();
  error = new Subject<string>();

  constructor(private appService: AppServiceService) {}

  onModelSelect(modelSelect: ModelList) {
    this.mainModel.description = modelSelect.description;
    this.modelSelect = modelSelect;
    this.filterSubByCode(modelSelect.description).forEach(
      (item) => (this.checkColor = item)
    );

    this.appService.modelListValue.next(this.modelSelect);
    this.appService.colorValue.next({ code: '', description: '', price: 0 });
    this.selectedChoice = true;
    this.imageUrl = new Image();
  }

  filterSubByCode(description: string): Observable<Model[] | undefined> {
    return this.appService.getModelsByCode(description);
  }

  onColorSelect(colorModel: Model) {
    this.loadImageUrl();
    this.colorModel.description = this.colorSelect.description;
    this.optionsSelected = true;
    this.appService.modelCodeValue.next(this.modelSelect.code);
    this.appService.colorValue.next(this.colorSelect);
    this.sendToApp.emit(true);
    this.btnDisable2.emit(false);
  }

  loadImageUrl() {
    this.imageUrl = this.appService.loadImageHttp(
      this.modelSelect.code,
      this.colorSelect.code
    );
    this.appService.imageUrl.next(this.imageUrl);
  }

  models = this.appService.getModel.pipe(
    catchError((err) => {
      this.error.next(err.message);
      return of([]);
    })
  );
}
