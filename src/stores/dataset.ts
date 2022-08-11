import {acceptHMRUpdate, defineStore} from 'pinia'

// @ts-ignore
import {parse, ParseResult} from "papaparse"

const API = 'https://data.sci.xciv.de/temporal_corona_clustering/'

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
    cluster: 'cluster',
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
            clusters: [] as String[],
            activeDataset: '',
            activeGroup: '',
            activeCluster: '',
            isLoaded: false,
        }
    },
    actions: {
        loadDataset(dataset: Record<string, string>) {
            this.isLoaded = false

            load_data(API.concat(dataset.name, '.csv')).then((values) => {

                // @ts-ignore
                this.records = values.map(obj => ({...obj, show: true}))
                this.clusters = [LABEL.all].concat(toSet(values, LABEL.cluster).sort())
                this.groups = [LABEL.all].concat(toSet(values, LABEL.group))

                this.setActiveCluster(LABEL.all)
                this.setActiveGroup(LABEL.all)
                this.setActiveDataset(dataset.name)

                this.isLoaded = true
            })
        },
        setActiveDataset(value: string) {
            this.activeDataset = value
        },
        setActiveCluster(value: string) {
            this.activeCluster = value
            this.filter()
        },
        setActiveGroup(value: string) {
            this.activeGroup = value
            this.filter()
        },
        filter() {
            this.records.forEach((point: Record<any, any>) => {
                point.show = (
                    (this.activeCluster === "All" && this.activeGroup === "All") ||
                    (point.cluster === this.activeCluster && this.activeGroup === "All") ||
                    (this.activeCluster === "All" && point.datetime === this.activeGroup) ||
                    (point.cluster === this.activeCluster && point.datetime === this.activeGroup)
                )
            })
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDataset, import.meta.hot))
}