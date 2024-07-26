import {Component} from '@angular/core';

import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";


@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  standalone: true,
  imports: [MatExpansionModule],
  styleUrls: ['./guide.component.scss']
})


export class GuideComponent {
  panelOpenState = false;
}



