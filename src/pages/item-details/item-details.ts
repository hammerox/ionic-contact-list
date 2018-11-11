import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Contact } from '../../schemas/contact';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedIndex: number;
  selectedContact: Contact;
  contact: Contact

  storageKey: string = 'contact_list';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedIndex = navParams.get('index');
    this.selectedContact = navParams.get('item');
    this.contact = (this.selectedContact) ? JSON.parse(JSON.stringify(this.selectedContact)) : new Contact()
  }

  saveContact() {
    if (this.isValidContact()) {
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

    } else {
      this.toastCtrl.create({
        message: 'Preencha todos os campos',
        duration: 2000,
        position: 'bottom'
      }).present()
    }
    
  }

  isValidContact() : boolean {
    if (this.contact.name && this.contact.company && this.contact.occupation && this.contact.email && this.contact.phone && this.contact.birthdate) {
      return true
    } else {
      return false
    }
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
    this.toastCtrl.create({
      message: 'Sucesso!',
      duration: 2000,
      position: 'bottom'
    }).present()
    
    this.navParams.get('parentPage').refreshList();
    this.navCtrl.pop()
  }
}
