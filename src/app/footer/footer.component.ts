import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements AfterViewInit {

  constructor(public media: TdMediaService) {}

  ngAfterViewInit() {
    this.media.broadcast();
  }
}
