import { Injectable } from '@angular/core';
import {getString, remove, setString, getAllKeys, clear} from 'tns-core-modules/application-settings';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    store(name: string, value) {
        console.log('aaa storing: ', name);
        setString(this.modifyName(name), JSON.stringify(value));
    }

    clear(name: string) {
        remove(this.modifyName(name));
    }

    clearAll() {
        clear();
    }

    retrieve(name: string) {
        console.log('aaa retrieve: ', name);
        const value = getString(this.modifyName(name));
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

    private modifyName(name: string) {
        return 'manto-storage|' + name.toLowerCase();
    }

    GetAll() {
        return getAllKeys();
    }
}
