import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employee | undefined> {
    const employee = await this.employeeRepository.findOne(id as any); // explicitly cast id to any
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async create(employeeData: Employee): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }

  async update(id: number, employeeData: Partial<Employee>): Promise<Employee | undefined> {
    await this.employeeRepository.update(id, employeeData);
    return this.employeeRepository.findOne(id as any); // explicitly cast id to any
  }

  async remove(id: number): Promise<void> {
    const employee = await this.findOne(id); // Using the findOne method to check if the employee exists
    if (employee) {
      await this.employeeRepository.delete(id);
    } else {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
