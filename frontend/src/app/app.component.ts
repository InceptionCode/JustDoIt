import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'JustDoIt';

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            user(userId: "K7NG_k72_095ER_-lwtFr") {
              username
            }
          }
          `
    }).valueChanges.subscribe((result: any) => {
      console.log(result.data)
    })
  }
}
