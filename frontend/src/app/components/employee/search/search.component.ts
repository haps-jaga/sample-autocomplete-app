import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Employee } from "src/app/models/employee.model";
import { Subject, Observable, Subscription, EMPTY, fromEvent } from "rxjs";
import { EmployeeService } from "src/app/services/employee.service";
import { FormBuilder, FormControl } from "@angular/forms";
import {
  MatAutocompleteTrigger,
  MatAutocomplete,
} from "@angular/material/autocomplete";
import {
  startWith,
  debounceTime,
  filter,
  tap,
  switchMap,
  exhaustMap,
  catchError,
  takeWhile,
  map,
  scan,
  takeUntil,
} from "rxjs/operators";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.less"],
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild("auto", { static: false }) autocompleteRef: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger, { static: false })
  autocompleteTrigger: MatAutocompleteTrigger;

  public isLoading: boolean;
  public searchText: FormControl;
  public filterResults: Employee[] = [];

  private filterSubcription$: Subscription;
  private nextPage$ = new Subject();
  private filter$: Observable<any>;
  private startWith = "";

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.searchText = this.fb.control("");
  }

  get showNoData(): boolean {
    return this.filterResults.length === 0;
  }

  public autocompleteScroll() {
    setTimeout(() => {
      if (
        this.autocompleteRef &&
        this.autocompleteTrigger &&
        this.autocompleteRef.panel
      ) {
        fromEvent(this.autocompleteRef.panel.nativeElement, "scroll")
          .pipe(
            map(() => this.autocompleteRef.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(() => {
            const scrollTop = this.autocompleteRef.panel.nativeElement
              .scrollTop;
            const scrollHeight = this.autocompleteRef.panel.nativeElement
              .scrollHeight;
            const elementHeight = this.autocompleteRef.panel.nativeElement
              .clientHeight;
            const atBottom = scrollHeight === scrollTop + elementHeight;
            if (atBottom) {
              this.nextPage$.next();
            }
          });
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.filter$ = this.searchText.valueChanges.pipe(
      startWith(this.startWith),
      debounceTime(1000),
      filter((q) => typeof q === "string"),
      tap(() => (this.filterResults = []))
    );

    this.filterSubcription$ = this.filter$
      .pipe(
        switchMap((key) => {
          // reset page and data set for new search
          let currentPage = 0;
          return this.nextPage$.pipe(
            startWith(currentPage),
            tap(() => {
              this.isLoading = true;
            }),
            exhaustMap((_) =>
              this.employeeService.searchEmployee(key, currentPage + 1)
            ),
            catchError(() => {
              this.isLoading = false;
              return EMPTY;
            }),
            tap(() => {
              this.isLoading = false;
              currentPage++;
            }),
            takeWhile((data: Employee[]) => data.length > 0),
            map((data) => {
              return data;
            }),
            scan(
              (allEmployees, newEmployees) => allEmployees.concat(newEmployees),
              []
            ),
            tap((results) => {
              this.filterResults = results;
            })
          );
        })
      )
      .subscribe();
  }
}
