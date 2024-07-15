import Airtable, { FieldSet, RecordData} from "airtable";

import { TableFields } from '../types/types';

const pathResolve = require('node:path');
require('dotenv').config({ path: pathResolve.resolve(__dirname, '../../.env') });

const airTableApi = process.env.AIRTABLE_API
const airTableBase = String(process.env.AIRTABLE_BASE)

var base = new Airtable({
    endpointUrl: 'https://api.airtable.com', 
    apiKey: airTableApi
}).base(airTableBase);


export async function getTable(table: string, filter: string = ""): Promise<Map<string, Map<string, any>>> {
    let retrieved = new Map<string, Map<string, any>>();

    await new Promise<void>((resolve, reject) => {
        base(table).select({
            filterByFormula: filter
        }).eachPage(
            (records, fetchNextPage) => {
                records.forEach(record => {
                    retrieved.set(record.id, new Map(Object.entries(record.fields)));
                });
                fetchNextPage();
            },
            err => {
                if (err) {
                    console.error("Error fetching records:", err);
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });

    console.log("Retrieved data:", retrieved);
    return retrieved;
}


export async function getRecord(table: string, id: string): Promise<Map<string, any>> {
    let retrieved = new Map<string, any>();

    await new Promise<void>((resolve, reject) => {
        base(table).find(id, function(err, record) {
            if (err) {
                console.error("Error fetching record:", err);
                reject(err);
            } else {
                if (record) {
                    retrieved.set(record["id"], new Map(Object.entries(record["fields"])));
                    console.log("Retrieved record:", record);
                } else {
                    console.log(`Record with ID ${id} not found.`);
                }
                resolve();
            }
        });
    });

    return retrieved;
}

export function createRecord(table: string, record: any[]): void {

    base(table).create(record).then(records => {
        records.forEach(function (record) {
            console.log(record.getId());
        });
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}


export function updateRecord(table: string, record: any[]): void {    

    base(table).update(record).then( records => {
        records.forEach(function(record) {
            console.log(record.getId());
        });
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}


export function deleteRecords(table: string, records: string[]): void {
    base(table).destroy(records, (err, deletedRecords) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Deleted', deletedRecords!.length, 'records');
    });
}
