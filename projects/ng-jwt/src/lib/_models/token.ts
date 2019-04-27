declare function escape(s: string): string;

export class TokenError extends Error {

	name = 'TokenError';

	constructor(message: string) {
		super(message);
	}
}

export class Token {
	constructor(public token: string) {
		if (this.token != null && this.isExpired()) {
			token = null;
		}
	}

	private decodeBase64(str: string): string {
		let output = str.replace(/-/g, '+').replace(/_/g, '/');
		switch (output.length % 4) {
			case 0: {
				break;
			}
			case 2: {
				output += '==';
				break;
			}
			case 3: {
				output += '=';
				break;
			}
			default: {
				throw new TokenError('Illegal base64url string!');
			}
		}

		return decodeURIComponent(escape(typeof window === 'undefined' ? atob(output) : window.atob(output)));
	}

	public decodeToken(): any {
		const parts = this.token.split('.');

		if (parts.length !== 3) {
			throw new TokenError('A JWT Token must have 3 parts!');
		}

		const decoded = this.decodeBase64(parts[1]);
		if (!decoded) {
			throw new TokenError('Cannot decode the token!');
		}

		return JSON.parse(decoded);
	}

	public getExpirationDate(): Date {
		const decoded = this.decodeToken();

		if (!decoded.hasOwnProperty('exp')) {
			return new Date();
		}

		const date = new Date(0);
		date.setUTCSeconds(decoded.exp);

		return date;
	}

	public isExpired(offsetSeconds: number = 0): boolean {
		const date = this.getExpirationDate();

		if (date.getSeconds() === new Date().getSeconds()) {
			return false;
		}

		return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
	}
}
