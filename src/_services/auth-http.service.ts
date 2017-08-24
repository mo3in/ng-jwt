import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, RequestOptions, Request, RequestMethod, Headers, Response} from '@angular/http';

import {TokenService} from './token.service';

import {Observable} from 'rxjs/Observable';
import {Token} from '../_models/token';
import {AuthConfig} from '../auth.config';

@Injectable()
export class AuthHttp {
	constructor(private config: AuthConfig, private _tokenService: TokenService, private _http: Http, private _options: RequestOptions) {
		this.config = new AuthConfig(config);
	}

	private mergeOptions(providedOpts: RequestOptionsArgs, defaultOpts?: RequestOptions) {
		let newOptions = defaultOpts || new RequestOptions();
		if (this.config.globalHeaders) {
			this.setGlobalHeaders(this.config.globalHeaders, providedOpts);
		}

		newOptions = newOptions.merge(new RequestOptions(providedOpts));

		return newOptions;
	}

	private requestHelper(requestArgs: RequestOptionsArgs, additionalOptions?: RequestOptionsArgs): Observable<Response> {
		let options = new RequestOptions(requestArgs);
		if (additionalOptions) {
			options = options.merge(additionalOptions);
		}

		return this.request(new Request(this.mergeOptions(options, this._options)));
	}

	public setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs) {
		if (!request.headers) {
			request.headers = new Headers();
		}

		headers.forEach((header: Object) => {
			const key: string = Object.keys(header)[0];
			const headerValue: string = (header as any)[key];
			(request.headers as Headers).set(key, headerValue);
		});
	}

	public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
		if (typeof url === 'string') {
			return this.get(url, options); // Recursion: transform url from String to Request
		}

		// from this point url is always an instance of Request;
		const req: Request = url as Request;
		const token: Token = this._tokenService.getToken();
		return this.requestWithToken(req, token);
	}

	private requestWithToken(req: Request, token: Token): Observable<Response> {
		if (token.isExpired()) {
			if (!this.config.noJwtError) {
				return new Observable<Response>((obs: any) => {
					obs.error(new Error('No JWT present or has expired'));
				});
			}
		} else {
			req.headers.set(this.config.headerName, this.config.headerPrefix + " " + token.token);
		}

		return this._http.request(req);
	}

	public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this.requestHelper({body: '', method: RequestMethod.Get, url: url}, options);
	}

	public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		return this.requestHelper({body: body, method: RequestMethod.Post, url: url}, options);
	}

	public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		return this.requestHelper({body: body, method: RequestMethod.Put, url: url}, options);
	}

	public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this.requestHelper({body: '', method: RequestMethod.Delete, url: url}, options);
	}

	public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		return this.requestHelper({body: body, method: RequestMethod.Patch, url: url}, options);
	}

	public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this.requestHelper({body: '', method: RequestMethod.Head, url: url}, options);
	}

	public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this.requestHelper({body: '', method: RequestMethod.Options, url: url}, options);
	}
}