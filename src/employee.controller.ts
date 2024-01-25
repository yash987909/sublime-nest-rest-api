import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findOne(+id);
  }

  @Post()
  create(@Body() employeeData: Employee): Promise<Employee> {
    return this.employeeService.create(employeeData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() employeeData: Employee): Promise<Employee> {
    return this.employeeService.update(+id, employeeData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.remove(+id);
  }
}
