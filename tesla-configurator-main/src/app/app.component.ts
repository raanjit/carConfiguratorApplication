import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Config, ConfigList } from './service/config';
import { AppServiceService } from './service/app-service.service';
import { Model, ModelList } from './service/model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    AsyncPipe,
    CommonModule,
    JsonPipe,
    Step1Component,
    Step2Component,
    Step3Component,
    RouterLink,
    RouterModule,
  ],
  providers: [HttpClientModule],
})
export class AppComponent {
  name = 'Angular';
  constructor(private appService: AppServiceService) {}

  modelCode: string = '';
  configList: ConfigList = { configs: [], towHitch: false, yoke: false };
  image?: HTMLImageElement;
  btnText: string = '';
  color: Model = { code: '', description: '', price: 0 };
  modelList: ModelList = { colors: [], code: '', description: '' };
  config: Config = { id: 0, description: '', price: 0, range: 0, speed: 0 };

  displayStep1: boolean = false;
  displayStep2: boolean = false;
  displayStep3: boolean = false;
  step2BtnDisable: boolean = true;
  step3BtnDisable: boolean = true;

  onStep1Click() {
    this.displayStep1 = true;
    this.displayStep2 = false;
    this.displayStep3 = false;
    this.btnText = 'step1';
  }

  onStep2Click() {
    this.displayStep1 = false;
    this.displayStep2 = true;
    this.displayStep3 = false;
    this.appService.modelCodeValue.subscribe((data) => {
      this.modelCode = data;
    });
    if (this.btnText == 'step1') {
      this.configList = this.appService.step2Renderer(this.modelCode);
      this.step3BtnDisable = true;
    }
    this.appService.configValue.subscribe((data) => {
      this.config = data;
    });
    this.appService.imageUrl.subscribe((data) => {
      this.image = data;
    });
    this.btnText = 'step2';
  }

  onStep3Click() {
    this.displayStep3 = true;
    this.displayStep1 = false;
    this.displayStep2 = false;
    this.btnText = 'step3';
    this.appService.colorValue.subscribe((data) => {
      if (data.description != null) {
        this.color = data;
      } else {
        this.color = { code: '', description: '', price: 0 };
      }
    });

    this.appService.modelListValue.subscribe((data) => {
      this.modelList = data;
    });
    this.appService.configValue.subscribe((data) => {
      if (data.description != null) {
        this.config = data;
      } else {
        this.config = { id: 0, description: '', price: 0, range: 0, speed: 0 };
      }
    });
    this.appService.imageUrl.subscribe((data) => {
      this.image = data;
    });
  }

  step2Enable() {
    this.step2BtnDisable = false;
  }

  step3Enable() {
    this.step3BtnDisable = false;
  }

  setStep2Btn(event: any) {
    this.step2BtnDisable = event.value;
  }
}
