import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Contact } from '../../schemas/contact';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedIndex: number;
  selectedContact: Contact;
  contact: Contact

  storageKey: string = 'contact_list';
  storage: Storage

  constructor(public navCtrl: NavController, public navParams: NavParams, public strg: Storage) {
    this.storage = strg;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedIndex = navParams.get('index');
    this.selectedContact = navParams.get('item');
    this.contact = (this.selectedContact) ? JSON.parse(JSON.stringify(this.selectedContact)) : new Contact()
  }

  saveContact() {
    this.storage.get(this.storageKey).then((items) => {
      console.log(items)
      if (this.selectedIndex == undefined) {
        items.push(this.contact);
      } else {
        items[this.selectedIndex] = this.contact
      }
      console.log(items)

      this.storage.set(this.storageKey, items).then((val) => {
        this.closePage()
      })
    });
  }

  deleteContact() {
    this.storage.get(this.storageKey).then((items) => {
      items.splice(this.selectedIndex, 1)

      this.storage.set(this.storageKey, items).then((val) => {
        this.closePage()
      })
    });
  }

  closePage() {
    console.log('SUCESSO');
    this.navParams.get('parentPage').refreshList();
    this.navCtrl.pop()
  }
}
