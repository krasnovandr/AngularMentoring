import { HttpParams } from '@angular/common/http';

export interface IParamDictionary {
    [key: string]: string | number | boolean;
}

export class HttpClientHelper {
    public static createUrl(endpoint: string, path: string | string[]): string {
        const e = endpoint.slice(-1) === '/' ? endpoint.slice(0, -1) : endpoint;
        let p: string = path instanceof Array ? path.join('/') : path;
        p = p.substring(0, 1) === '/' ? p.substring(1) : p;

        return `${e}/${p}`;
    }

    public static createParams(params: IParamDictionary): HttpParams {
        return new HttpParams({
            fromObject: { ...this.buildParams(params) }
        });
    }

    private static buildParams(params: IParamDictionary): { [key: string]: string } {
        const result = {};

        Object.keys(params).forEach((key) => {
            result[key] = params[key].toString();
        });

        return result;
    }
}
