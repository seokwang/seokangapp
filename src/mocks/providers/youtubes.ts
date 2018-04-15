import { Injectable } from '@angular/core';
import { Item } from '../../models/item';

@Injectable()
export class Youtubes {
  items: Item[] = [];

  defaultItem: any = {
    "url": "https://www.youtube.com/watch?v=3roUGgUJrzw",
    "date": "2016-05-11"
  };

  constructor() {
    let items =  [
        {
            "url": "https://www.youtube.com/watch?v=3roUGgUJrzw",
                "date": "2016-05-11"
        },
        {
            "url": "https://www.youtube.com/watch?v=3roUGgUJrzw",
                "date": "2016-05-11"
        }
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
           	var video_id = item.url.split('v=')[1].split('&')[0];
            return "https://www.youtube.com/embed/" + video_id;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
