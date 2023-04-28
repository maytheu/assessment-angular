import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from 'src/app/service/dashboard.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable, map } from 'rxjs';
import { Flight } from 'src/app/widgets/flight.model';
import { WidgetsModule } from 'src/app/widgets/widgets.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, WidgetsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  flights$!: Observable<MatTableDataSource<Flight>>;

  tableCol = [
    'estDepartureAirport',
    'estArrivalAirport',
    'lastSeen',
    'departureAirportCandidatesCount',
    'arrivalAirportCandidatesCount',
  ];

  tableTitle = [
    'departure airpoort',
    'arrival airport',
    'time',
    'departre count',
    'arrival count',
  ];

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.flights$ = this.onLoad();
  }

  ngAfterViewInit(): void {
    this.flights$ = this.onLoad();
  }

  private onLoad(): Observable<MatTableDataSource<Flight>> {
    return this.dashboard.loadflight().pipe(
      map((flight) => {
        const datasource = new MatTableDataSource(flight);
        datasource.paginator = this.paginator;
        return datasource;
      })
    );
  }
}
