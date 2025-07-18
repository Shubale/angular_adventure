import { Equipment } from './equipment';
import Position from './position';

export default class Container {
  public data: Array<Array<Equipment>>;
  constructor(width: number, height: number) {
    this.data = Array.from({ length: height }, () =>
      Array.from({ length: width }),
    );
  }

  putItem(item: Equipment): void {
    for (let i = 0; i < item.size[0]; i++) {
      for (let j = 0; j < item.size[1]; j++) {
        this.data[j + item.position[0]][i + item.position[1]] = item;
        console.log(j + item.position[0], i + item.position[1]);
      }
    }
    // this.data[0][0] = item;
  }
}
