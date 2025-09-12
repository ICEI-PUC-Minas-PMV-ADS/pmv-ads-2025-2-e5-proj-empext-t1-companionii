import { Body, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from '../common/guards/roles.guard';
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";

@ApiTags('account')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.create(createAccountDto);
  }

  @Get()
  async findAll() {
    return await this.accountService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.accountService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return await this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.accountService.remove(id);
  }
}