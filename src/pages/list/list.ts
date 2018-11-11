import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public platform: Platform) {
    this.refreshList()
  }


  itemTapped(event, item, index) {   
    console.log(item.title);
    this.navCtrl.push(ItemDetailsPage, {
      parentPage: this,
      index: index,
      item: item
    });
  }

  addContact() {
    this.navCtrl.push(ItemDetailsPage, {
      parentPage: this
    });
  }

  refreshList() {
    this.storage.get(this.storageKey).then((val) => {
      this.items = val

      // Mock if empty
      if (val == undefined || this.items.length === 0) {
        this.items = []
        this.mockList()
      }

      console.log(val);
    })
  }

  mockList() {
    this.items.push({
      name: 'Davi Sousa',
      occupation: 'Material recording',
      company: 'JasmineSola',
      phone: '(42) 7445-8167',
      email: 'DaviSousaFerreira@rhyta.com',
      birthdate: '1940-03-24'
    });

    this.items.push({
      name: 'Isabela Melo Ribeiro',
      occupation: 'Recreational vehicle service technician',
      company: 'Asian Fusion',
      phone: '(47) 2299-6712',
      email: 'IsabelaMeloRibeiro@armyspy.com',
      birthdate: '1963-06-11'
    });

    this.items.push({
      name: 'Vinicius Ferreira',
      occupation: 'Press operator',
      company: 'Krauses Sofa Factory',
      phone: '(27) 2981-7775',
      email: 'ViniciusOliveiraFerreira@dayrep.com',
      birthdate: '1982-03-30'
    });

    this.storage.set(this.storageKey, this.items)
  }
}
