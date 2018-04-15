import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Churchs {
  items: Item[] = [];

  defaultItem: any = {
    "name": "최고센 목사",
    "position": "Nyskc 대표회장",
    "church": "뉴욕서광교회",
    "profilePic": "assets/img/avatar.png",
    "tel1": "718-786-6763",
    "tel2": "",
    "homepage": "http://www.nyskc.org"
  };

  constructor() {
    let items = [
      {
        "name": "최고센 목사",
        "position": "Nyskc 대표회장",
        "church": "뉴욕서광교회",
        "profilePic": "assets/img/avatar.png",
        "tel1": "718-786-6763",
        "tel2": "",
        "homepage": "http://www.nyskc.org"
      },
      {
        "name": "박재준 목사",
        "position": "Nyskc 대외업무실장",
        "church": "",
        "profilePic": "assets/img/avatar.png",
        "tel1": "",
        "tel2": "",
        "homepage": ""
      },
      {
        "name": "강효열 목사",
        "position": "",
        "church": "아가페 침례교회",
        "profilePic": "assets/img/avatar.png",
        "tel1": "937-256-0387",
        "tel2": "937-428-4836",
        "homepage": ""
      },
      {
        "name": "김은목 목사",
        "position": "",
        "church": "LA 평화교회",
        "profilePic": "assets/img/avatar.png",
        "tel1": "213-251-9191",
        "tel2": "213-388-1576",
        "homepage": ""
      },
      {
        "name": "유경열 목사",
        "position": "",
        "church": "MD 서광교회",
        "profilePic": "assets/img/avatar.png",
        "tel1": "410-458-9811",
        "tel2": "410-740-1436",
        "homepage": ""
      },
      {
        "name": "유제씨 목사",
        "position": "",
        "church": "토론토 서광교회",
        "profilePic": "assets/img/avatar.png",
        "tel1": "416-897-0522",
        "tel2": "416-441-0227",
        "homepage": ""
      },
      {
        "name": "전남수 목사",
        "position": "",
        "church": "알칸사 제자들교회",
        "profilePic": "assets/img/avatar.png",
        "tel1": "501-920-9049",
        "tel2": "501-221-3164",
        "homepage": ""
      },
      {
        "name": "최기성 목사",
        "position": "",
        "church": "은혜와 사랑교회",
        "profilePic": "assets/img/avatar.png",
        "tel1": "914-772-4036",
        "tel2": "914-946-1755",
        "homepage": ""
      },
      {
        "name": "최태영 목사",
        "position": "",
        "church": "토론토 충신교회",
        "profilePic": "assets/img/avatar.png",
        "tel1": "416-624-4612",
        "tel2": "416-756-9121",
        "homepage": ""
      },
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
