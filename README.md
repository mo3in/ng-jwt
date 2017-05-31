
# ng-jwt

[![npm version][ico-version]][link-npm]
[![license][ico-license]][link-npm]

Provides an angular2 auth module to handle authentication based on JWT
## Installation

To install this library, run:

```bash
$ npm install ng-jwt --save
```

## Sending Requests
If you want to send a request with the `Authorization` header set with the JWT token you can use the `AuthHttp` class.
```ts
import { AuthHttp } from 'angular2-auth';
...
@Component({
  ...
})
export class AppComponent {
  constructor(private _authHttp: AuthHttp) {}
  
  getThing() {
    this._authHttp.get('/get/thing')
      .subscribe(
        data => this.thing = data,
        error => console.error(error),() => console.log('getThing#done')
  }
}
```

## License

MIT © [Mo3in](mailto:moein.hente@gmail.com)
