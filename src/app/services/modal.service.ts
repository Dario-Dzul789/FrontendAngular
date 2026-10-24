import { Injectable, signal  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isOpen = signal(false);
  title = signal('');
  data: any = null;

  open(title: string, data?: any): void {
    this.title.set(title);
    this.data = data;
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.data = null;
  }
}
