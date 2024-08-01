import Airtable, { FieldSet, RecordData} from "airtable";

import { TableFields } from '../types/types';

const pathResolve = require('node:path');
require('dotenv').config({ path: pathResolve.resolve(__dirname, '../../.env') });

const airTableApi = process.env.AIRTABLE_API
const airTableBase = String(process.env.AIRTABLE_BASE)
import { AirtableError } from '../utils/AirtableErr';

var base = new Airtable({
    endpointUrl: 'https://api.airtable.com', 
    apiKey: airTableApi
}).base(airTableBase);


export async function getTable(table: string, filter: string = ""): Promise<Array<Map<string, any>>> {
    // let retrieved = new Map<string, Map<string, any>>();
    let retrieved: Array<Map<string, any>> = new Array<Map<string, any>>;

    await new Promise<void>((resolve, reject) => {
        base(table).select({
            filterByFormula: filter
        }).eachPage(
            (records, fetchNextPage) => {
                records.forEach(record => {
                    let content = new  Map(Object.entries(record.fields))
                    content.set("id", record.id);
                    retrieved.push(content);
                });
                fetchNextPage();
            },
            err => {
                if (err) {
                    console.error("Error fetching records:", err);
                    reject(new AirtableError(err.statusCode, err.message));
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
                reject(err); 
                if (err instanceof Error) {
                    console.error("Error fetching record:", err);
                    throw new AirtableError((err as any).statusCode || 500, err.message);
                } else {
                    console.error("Unknown error:", err);
                    throw new AirtableError(500, "An unknown error occurred");
                }
            }else {
                resolve();
            }
            retrieved.set(record!["id"], new Map(Object.entries(record!["fields"])));
        });
    });

    return retrieved;
}

export async function createRecord(table: string, record: any[]): Promise<void> {
    try {
        const records = await base(table).create(record);
        records.forEach(record => {
            console.log(record.getId());
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error creating record:", err);
            throw new AirtableError((err as any).statusCode || 500, err.message);
        } else {
            console.error("Unknown error:", err);
            throw new AirtableError(500, "An unknown error occurred");
        }
    }
}


export async function updateRecord(table: string, record: any[]): Promise<void> {
    try {
        const records = await base(table).update(record);
        records.forEach(record => {
            console.log(record.getId());
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error updating record:", err);
            throw new AirtableError((err as any).statusCode || 500, err.message);
        } else {
            console.error("Unknown error:", err);
            throw new AirtableError(500, "An unknown error occurred");
        }
    }
}


export async function deleteRecords(table: string, records: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        base(table).destroy(records, (err, deletedRecords) => {
            if (err) {
                reject(new AirtableError(err.statusCode, err.message));
                return;
            }
            console.log('Deleted', deletedRecords!.length, 'records');
            resolve();
        });
    });
}