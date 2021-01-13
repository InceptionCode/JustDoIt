import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'JustDoIt';
  _testSubscription: Subscription = new Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this._testSubscription = this.apollo
      .watchQuery({
        query: gql`
          {
            todos {
              text
              createdBy {
                username
              }
            },
            tags {
              label
            }
          }
          `
    }).valueChanges.subscribe((result: any) => {
      console.log(result.data)
    })
  }

  ngOnDestroy() {
    this._testSubscription.unsubscribe()
  }
}
