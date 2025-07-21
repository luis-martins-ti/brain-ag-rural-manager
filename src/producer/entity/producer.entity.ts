import { PropertyEntity } from '../../property/entity/property.entity';

export class ProducerEntity {
  id: string;
  cpfCnpj: string;
  name: string;
  properties: PropertyEntity[];
}