import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "site-root-agent";
  private _messageToPost: string = "Initial Message To Post";

  @Input()
  postMessageToConsole = (messageToPost: string) => {
    this._messageToPost = messageToPost;
    console.log("messageToPost", messageToPost);
    console.log("this._messageToPost", this._messageToPost);
  };

  @Input()
  fauxHttpRequest = (
    httpRequestString: string,
    httpRequestCallback: Function
  ): void => {
    console.log("httpRequestString", httpRequestString);
    console.log("httpRequestCallback", httpRequestCallback);

    const fautxHttpResponsePayload = [
      {
        id: 1,
        productName: "Apple"
      },
      {
        id: 2,
        productName: "Orange"
      }
    ];

    of(fautxHttpResponsePayload)
      .pipe(delay(4000))
      .subscribe((fauxHttpResponse: Array<Object>) => {
        httpRequestCallback(fautxHttpResponsePayload);
      });
  };

  public constructor() {
    console.log("SiteRootAgent.constructor() invoked");
  }

  ngOnInit(): void {
    console.log("SiteRootAgent.ngOnInit() invoked");
  }

  ngOnDestroy(): void {
    console.log("SiteRootAgent.ngOnDestroy() invoked");
  }

  // public postMessageToConsole(messageToPost: string) {
  //   console.log("messageToPost: ", messageToPost);
  // }
}
