import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, take } from 'rxjs';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  alertDialogRef: MatDialogRef<AlertDialogComponent>;
  
  public confirm(title:string, message:string, cancelText:string = "Retour", confirmText:string = "Oui") {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
         data: {
           title: title,
           message: message,
           cancelText: cancelText,
           confirmText: confirmText
         }
    });
    return this.confirmed();
  }

  public info(title:string, message:string) {
    this.alertDialogRef = this.matDialog.open(AlertDialogComponent, {
         data: {
           title: title,
           message: message,
         }
    });
  }

  public alert(title:string, message:string) {
    this.alertDialogRef = this.matDialog.open(AlertDialogComponent, {
         data: {
           title: title,
           message: message,
         }
    });
  }

  public confirmed(): Observable<any> {
    return this.confirmDialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
}