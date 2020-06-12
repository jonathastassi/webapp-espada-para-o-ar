import { Action } from '@ngrx/store';

export class BaseAction implements Action {
    type: string;
    payload: any;
}
