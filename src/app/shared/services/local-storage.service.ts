import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    store(name: string, value) {
        localStorage.setItem(this.modifyName(name), JSON.stringify(value));
    }

    clear(name: string) {
        localStorage.removeItem(this.modifyName(name));
    }

    retrieve(name: string) {
        const item = localStorage.getItem(this.modifyName(name));
        try {
            return JSON.parse(item);
        } catch (e) {
            return item;
        }
    }

    private modifyName(name: string) {
        return 'manto-storage|' + name.toLowerCase();
    }
    GetAll() {

    }
}
