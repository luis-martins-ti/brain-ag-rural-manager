import { HarvestEntity } from '../../harvest/entity/harvest.entity';

export class PropertyEntity {
  id: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  harvests: HarvestEntity[];
}