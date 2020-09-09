import { Injectable } from '@angular/core';
import {getString, remove, setString} from 'tns-core-modules/application-settings';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    store(name: string, value) {
        setString(this.modifyName(name), JSON.stringify(value));
    }

    clear(name: string) {
        remove(this.modifyName(name));
    }

    retrieve(name: string) {
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
}
