// @ts-ignore
import {parse, ParseResult} from "papaparse";

const API = 'https://data.sci.xciv.de/temporal_corona_clustering/'

const DATASETS: Array<Record<string, string>> = [
    {name: "mask.sample.50.coronabert"},
    {name: "mask.sample.250.coronabert"}
]

async function load_data(url: any): Promise<any> {
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

export {API, DATASETS, load_data}