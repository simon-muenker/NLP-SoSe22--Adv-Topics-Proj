import type {ParseResult} from "papaparse";
import {parse} from "papaparse";


export async function load_data(url: any): Promise<any> {
    // @ts-ignore
    return new Promise((resolve: any, reject: any) => {
        // @ts-ignore
        parse(url, {
            header: true,
            complete: (results: ParseResult<any>) => {
                return resolve(results.data);
            },
            worker: true,
            download: true,
            skipEmptyLines: true,
        });
    });
}