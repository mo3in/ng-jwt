/**
 * Created by Mo3in on 5/29/2017.
 */

export interface IAuthConfig {
	globalHeaders?: Array<Object>;
	headerName?: string;
	headerPrefix?: string;
	noJwtError?: boolean;
	noTokenScheme?: boolean;
	loginEndPoint?: string;
	loginTokenName?: string;
	loginParams?: ILoginParams;
	guards?: {
		loggedInGuard: {
			redirectUrl: string;
		},
		loggedOutGuard: {
			redirectUrl: string;
		},
	};
}
export interface ILoginParams {
	[key: string]: string;
}


export class AuthConfig implements IAuthConfig {
	public globalHeaders: Array<Object>;
	public headerName: string;
	public headerPrefix: string;
	public loginEndPoint: string;
	public loginTokenName: string;
	public loginParams?: ILoginParams;
	public noJwtError: boolean;
	public guards?: {
		loggedInGuard: {
			redirectUrl: string;
		},
		loggedOutGuard: {
			redirectUrl: string;
		},
	};

	constructor(config: IAuthConfig = {}) {
		for (let option in config)
			this[option] = config[option];

		for (let option in AUTH_CONFIG_DEFAULTS)
			this[option] = config[option] != null ? config[option] : AUTH_CONFIG_DEFAULTS[option];
	}
}

export const AUTH_CONFIG_DEFAULTS: IAuthConfig = {
	headerName: "Authorization",
	loginTokenName: "access_token",
	headerPrefix: "Bearer",
	noTokenScheme: false,
	noJwtError: false,
}