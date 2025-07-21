import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

function isValidCpf(value: string): boolean {
  const cpf = value.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(cpf[10]);
}

function isValidCnpj(value: string): boolean {
  const cnpj = value.replace(/\D/g, '');
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  const posBase = [5, 6];
  let pos = posBase[cnpj.length - 14];

  for (let i = 0; i < length; i++) {
    sum += +numbers[i] * pos;
    pos = pos === 2 ? 9 : pos - 1;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== +digits[0]) return false;

  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = posBase[cnpj.length - 14];

  for (let i = 0; i < length; i++) {
    sum += +numbers[i] * pos;
    pos = pos === 2 ? 9 : pos - 1;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === +digits[1];
}

export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCpfOrCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return isValidCpf(value) || isValidCnpj(value);
        },
        defaultMessage(_args: ValidationArguments) {
          return 'CPF ou CNPJ inválido';
        },
      },
    });
  };
}
