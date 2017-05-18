import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="va-branding">{{ title }} | <a href="{{ url }}" target="_blank">{{ brand }}</a></div>
  `,
  styles: [`
    .va-branding {
      padding-right: 0.5rem;
      text-align: right;
    }

    .va-branding a {
      text-decoration: none;
      color: white;
    }
  `]
})
export class BrandingComponent {
  title = `Cercador d'AV`;
  brand = 'CONFAVC';
  url = 'http://confavc.cat';
}
