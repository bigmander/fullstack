
import { JWTInfo } from './storage.interface';



export interface StorageService {

    save(args: JWTInfo): void;
    get(): JWTInfo;
    exists(): boolean;
    destroy(): void;
}
