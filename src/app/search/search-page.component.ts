import { Component } from "@angular/core";
import { HttpService } from "src/shared/http/http.service";
import {
  catchError,
  debounce,
  debounceTime,
  filter,
  map,
  switchMap,
} from "rxjs/operators";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { of, Subject, interval } from "rxjs";

import { Landmark } from "./../models/landmark.interface";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"],
})
export class SearchPageComponent {
  searchForm: FormGroup;
  nearByLandmark: FormControl;
  landmarkSearch$: Subject<void> = new Subject();
  landmarks: Landmark[] = [];

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      nearByLandmark: new FormControl(),
    });

    this.searchForm.valueChanges.subscribe(() => {
      if (this.searchForm.value.nearByLandmark.length >= 3) {
        this.landmarkSearch$.next();
      }
    });

    this.landmarkSearch$
      .pipe(debounce(() => interval(250)))
      .pipe(
        switchMap(() => {
          return this.httpService.getLandMarks({
            search: this.searchForm.value.nearByLandmark,
            city_id: 27,
          });
        })
      )
      .subscribe(
        (response) => {
          this.landmarks = response.body.data.landmarks;
        },
        (error) => {
          console.log("Error : ", error);
        }
      );
  }

  selectLandmark(landmark: Landmark) {
    this.searchForm.patchValue({
      nearByLandmark: landmark.name,
    });
  }

  clearSearchField() {
    this.searchForm.patchValue({
      nearByLandmark: "",
    });
    this.landmarks = [];
  }
}
