import {acceptHMRUpdate, defineStore} from 'pinia'

// @ts-ignore
import {parse, ParseResult} from "papaparse"

const API = 'https://data.sci.xciv.de/imdb/'

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

const LABEL = {
    all: 'All',
    group: 'datetime'
}

type Dataset = Array<Record<string, string>>
type Row = Record<string, string>

const toSet = (data: Dataset, col: string) => {
    return Array.from(new Set(data.map((a: Row) => a[col])))
}

export const useDataset = defineStore('dataset', {
    state: () => {
        return {
            records: [],
            groups: [] as String[],
            activeDataset: '',
            activeGroup: '',
            isLoaded: false,
        }
    },
    actions: {
        loadDataset(dataset: Record<string, string>) {
            this.isLoaded = false

            load_data(API.concat(dataset.name, '.csv')).then((values) => {

                // @ts-ignore
                this.records = values.map(obj => ({...obj, show: true}))
                this.groups = [LABEL.all].concat(toSet(values, LABEL.group))

                this.setActiveGroup(LABEL.all)
                this.setActiveDataset(dataset.name)

                this.isLoaded = true
            })
        },
        setActiveDataset(value: string) {
            this.activeDataset = value
        },
        setActiveGroup(value: string) {
            this.activeGroup = value
            this.filter()
        },
        filter() {
            this.records.forEach((point: Record<any, any>) => {
                point.show = this.activeGroup === "All" || point.datetime === this.activeGroup
            })
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDataset, import.meta.hot))
}