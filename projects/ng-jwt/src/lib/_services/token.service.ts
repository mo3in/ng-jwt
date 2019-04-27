import {Injectable} from '@angular/core';
import {Token} from '../_models/token';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable()
export class TokenService {

	private _token: BehaviorSubject<Token>;

	constructor() {
		this._token = new BehaviorSubject(new Token(localStorage.getItem('auth_token')));
	}

	/**
	 * Get the current token.
	 */
	getToken(): Token {
		const token = this._token.getValue();
		return (token && token.token) ? token : null;
	}

	/**
	 * Returns an stream of tokens.
	 */
	getTokenStream(): Observable<Token> {
		return this._token.asObservable();
	}

	/**
	 * Update the current token.
	 */
	setToken(token: string) {
		this._token.next(new Token(token));
		localStorage.setItem('auth_token', token);
	}

	/**
	 * Remove the current token.
	 */
	removeToken() {
		this._token.next(null);
		localStorage.removeItem('auth_token');
	}


}
