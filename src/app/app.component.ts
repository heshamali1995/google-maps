import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  PlaceAutocompleteComponent,
  PlaceSearchResult,
} from './components/place-autocomplete.component';
import { PlaceCardComponent } from './components/place-card.component';
import { MapDisplayComponent } from './components/map-display.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    PlaceAutocompleteComponent,
    PlaceCardComponent,
    MapDisplayComponent,
    NgIf,
  ],
  template: `
    <mat-toolbar color="primary"> Google Maps Integration</mat-toolbar>

    <div class="container">
      <div class="input-area">
        <h2>Set Your Location</h2>
        <app-place-autocomplete
          (placeChanged)="fromValue = $event"
          placeholder="Enter from address..."
        ></app-place-autocomplete>
      </div>
      <div class="display-area" [hidden]="!fromValue.address">
        <div>
          <app-place-card [data]="fromValue"></app-place-card>
        </div>
        <app-map-display [from]="fromValue"></app-map-display>
      </div>
      <fieldset>
        <legend>User Location</legend>
        <label>City Name</label>
        <input type="text" [value]="fromValue?.name || ''" />
        <label>Address Name</label>
        <input type="text" [value]="fromValue?.address || ''" />
      </fieldset>
    </div>
  `,
  styles: [
    `
      .input-area {
        display: flex;
        gap: 16px;
        align-items: center;
      }

      .display-area {
        display: flex;
        gap: 16px;
        align-items: flex-start;
        height: calc(100vh - 180px);

        > div {
          width: 30%;
          overflow: auto;
          padding: 8px;
          height: inherit;

          > * {
            margin-bottom: 16px;
          }
        }

        > app-map-display {
          width: 70%;
          height: inherit;
        }
      }

      .display-area[hidden] {
        display: none;
      }

      .container {
        padding: 24px;
      }

      app-place-autocomplete {
        width: 300px;
      }
    `,
  ],
})
export class AppComponent {
  fromValue: PlaceSearchResult = { address: '' };
  constructor() {
    console.log(this.fromValue);
  }
}
