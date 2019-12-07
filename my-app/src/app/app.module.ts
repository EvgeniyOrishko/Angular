import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule} from '@angular/material/select';
import {MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSortModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { ApiService } from './api.service';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [ApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
