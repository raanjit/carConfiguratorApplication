import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Config, ConfigList } from '../service/config';
import { AppServiceService } from '../service/app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component {
  configSelect: Config = {
    id: 0,
    description: '',
    price: 0,
    range: 0,
    speed: 0,
  };
  modelCode: string = '';
  @Input() showComponent: boolean = false;
  @Input() configList: ConfigList = {
    configs: [],
    towHitch: false,
    yoke: false,
  };
  @Output() sendToApp2 = new EventEmitter();
  @Input() imageUrl?: HTMLImageElement;

  constructor(private route: Router, private appService: AppServiceService) {}

  onSelect(config: Config) {
    this.appService.configValue.next(this.configSelect);
    this.sendToApp2.emit(true);
  }
}
