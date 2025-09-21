import { PartialType } from '@nestjs/swagger';
import { CreateCompaniesDto } from './create-companies.dto';

export class UpdateCompaniesDto extends PartialType(CreateCompaniesDto) {}
