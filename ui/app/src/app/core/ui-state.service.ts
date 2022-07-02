import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class UiState {
  constructor(public actionOngoing: boolean, public message:string) {}
}

export const initialUiState = {
  actionOngoing: false,
  message: 'Ready'
};

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
    private _uiState:BehaviorSubject<UiState> = new BehaviorSubject(initialUiState);
    private _listModule:Array<string> = [];

    get uiState() {
        return this._uiState.asObservable();
    }

    get state() {
      return this._uiState.value.actionOngoing;
    }

    startBackendAction(module:string = "default") {
      this._listModule.push(module);
      this._uiState.next({
          actionOngoing: true,
          message:'',
      });
    }

    endBackendAction(module:string = "default") {
      this._listModule = this._listModule.filter((obj:string) => (obj != module) && (obj != "default"))
      if (this._listModule.length == 0) {
        this._uiState.next({
          actionOngoing: false,
          message: '',
      });
      }
    }

    endAllBackendAction() {
      this._listModule = [];
      this._uiState.next({
        actionOngoing: false,
        message: '',
      });
    }

    isLoading(module:string = "default") {
      return this._listModule.includes(module);
    }
}