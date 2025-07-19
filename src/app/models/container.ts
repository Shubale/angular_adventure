import { Equipment } from './equipment';
import Position from './position';
import EquipmentSlots from './equipment_slots';

export class ContainerCell {
  constructor(
    public x: number,
    public y: number,
    public data: Equipment | undefined,
  ) {}
}

export default class Container {
  public data: Array<Array<ContainerCell>>;
  constructor(width: number, height: number) {
    this.data = Array.from({ length: height }, () =>
      Array.from({ length: width }),
    );
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.data[i][j] = new ContainerCell(j, i, undefined);
      }
    }
  }

  moveItem(item: Equipment, position: Position): boolean {
    const oldPosition = item.position;
    if (!this.canPutItem(item, position)) {
      console.log('Cant put item here');
      return false;
    }
    this.removeItem(item, oldPosition);
    this.putItem(item, position);
    return true;
  }

  putItem(item: Equipment, position: Position): boolean {
    if (!this.canPutItem(item, position)) {
      console.log('Cant put item here');
      return false;
    }
    for (let i = 0; i < item.size[1]; i++) {
      for (let j = 0; j < item.size[0]; j++) {
        this.data[j + position[0]][i + position[1]].data = item;
      }
    }
    item.position = position;
    return true;
  }

  removeItem(item: Equipment, position?: Position): void {
    position = position ?? item.position;
    if (!position) return;
    for (let i = position[1]; i < position[1] + item.size[1]; i++) {
      for (let j = position[0]; j < position[0] + item.size[0]; j++) {
        this.data[j][i].data = undefined;
      }
    }
  }

  canPutItem(item: Equipment, position: Position): boolean {
    if (item.size[0] + position[0] > this.data.length) {
      return false;
    }
    if (item.size[1] + position[1] > this.data[0].length) {
      return false;
    }
    return true;
  }
}
