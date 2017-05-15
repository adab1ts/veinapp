import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="va-branding">{{ brand }}</div>
  `,
  styles: [`
    .va-branding {
      padding-right: 0.5rem;
      text-align: right;
    }
  `]
})
export class BrandingComponent {
  brand = `Cercador d'AV | CONFAVC`;
}
