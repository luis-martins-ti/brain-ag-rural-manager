import { CropEntity } from '../../crop/entity/crop.entity';

export class HarvestEntity {
  id: string;
  year: number;
  crops: CropEntity[];
}