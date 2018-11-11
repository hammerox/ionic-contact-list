import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

import { Storage } from '@ionic/storage';
import { Contact } from '../../schemas/contact';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<Contact>;
  storageKey: string = 'contact_list';
  storage: Storage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public strg: Storage) {
    this.storage = strg;
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    // MOCK
    this.items = [];
    for(let i = 1; i < 11; i++) {
      let item = new Contact
      item.name = 'Item ' + i
      item.phone = 'This is item #' + i,
      item.icon = this.icons[Math.floor(Math.random() * this.icons.length)]
      this.items.push(item);
    }

    this.storage.set(this.storageKey, this.items).then((val) => {
      this.storage.get(this.storageKey).then((val) => {
        this.items = val
        console.log(val);
      })
    });
  }

  itemTapped(event, item, index) {
    // SIMULANDO REMOVE
    console.log(this.items[index])
    this.items.splice(index, 1)
    
    console.log(item.title);
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
