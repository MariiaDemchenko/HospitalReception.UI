import { Response } from '@angular/http';
export function ExtractData(res: Response): any {
    const body = res.json();
    return body || [];
}

export function HandleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error);
}
