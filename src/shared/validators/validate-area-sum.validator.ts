import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'validateAreaSum', async: false })
export class ValidateAreaSum implements ValidatorConstraintInterface {
  validate(_value: any, args: ValidationArguments) {
    const object = args.object as any;
    const sum = Number(object.agriculturalArea) + Number(object.vegetationArea);
    return sum <= Number(object.totalArea);
  }

  defaultMessage(args: ValidationArguments) {
    return 'A soma da área agricultável e vegetação não pode ser maior que a área total';
  }
}
