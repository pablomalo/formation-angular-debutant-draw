import {Component, OnInit} from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-formation-scalian-exo-canvas';

  // constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    // const dialogRef = this.dialog.open(ContentComponent);
  }
}
