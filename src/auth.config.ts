/**
 * Created by Mo3in on 5/28/2017.
 */

export interface IAuthConfig {
	globalHeaders?: Array<Object>;
	headerName?: string;
	headerPrefix?: string;
	noJwtError?: boolean;
	noTokenScheme?: boolean;
	guards?: {
		loggedInGuard: {
			redirectUrl: string;
		},
		loggedOutGuard: {
			redirectUrl: string;
		},
	}
}

/**
 * Sets up the authentication configuration.
 */

export class AuthConfig implements IAuthConfig {

	public globalHeaders: Array<Object>;
	public headerName: string;
	public headerPrefix: string;
	public noJwtError: boolean;
	public noTokenScheme: boolean;

	constructor(config: any = {}) {
		this.globalHeaders = config.globalHeaders || [];
		this.headerName = config.headerName || 'Authorization';
		if (config.headerPrefix) {
			this.headerPrefix = config.headerPrefix;
		} else if (config.noTokenScheme) {
			this.headerPrefix = '';
		} else {
			this.headerPrefix = 'Bearer ';
		}
		this.noJwtError = config.noJwtError || false;
		this.noTokenScheme = config.noTokenScheme || false;
	}

	public getConfig(): IAuthConfig {
		return this;
	}

}
