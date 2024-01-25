import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from '../src/employee.service';
import { Employee } from '../src/employee.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let employeeRepository: Repository<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository,
        },
      ],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
    employeeRepository = module.get<Repository<Employee>>(getRepositoryToken(Employee));
  });

  it('should be defined', () => {
    expect(employeeService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an employee by ID', async () => {
      const mockEmployee = new Employee();
      jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(mockEmployee);

      const result = await employeeService.findOne(1);

      expect(result).toEqual(mockEmployee);
    });

    it('should throw NotFoundException when employee not found by ID', async () => {
      jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(undefined);

      await expect(employeeService.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      const mockEmployeeData = {
        id:1,
        name: 'John Doe',
        date_of_birth: new Date(),
        age: 30,
        salary: 50000.0,
      };


      const mockEmployee = new Employee();  // Create an instance of the Employee entity
      mockEmployee.name = mockEmployeeData.name;
      mockEmployee.date_of_birth = mockEmployeeData.date_of_birth;
      mockEmployee.age = mockEmployeeData.age;
      mockEmployee.salary = mockEmployeeData.salary;

      jest.spyOn(employeeRepository, 'create').mockReturnValue(mockEmployee);
      jest.spyOn(employeeRepository, 'save').mockResolvedValue(mockEmployee);

      const result = await employeeService.create(mockEmployeeData);

      expect(result).toEqual(mockEmployee);
    });

    it('should throw ConflictException when trying to create an employee with an existing ID', async () => {
      const mockEmployeeData = {
        id: 1,
        name: 'John Doe',
        date_of_birth: new Date(),
        age: 30,
        salary: 50000.0,
      };

      jest.spyOn(employeeRepository, 'findOne').mockResolvedValue({} as Employee);

      await expect(employeeService.create(mockEmployeeData)).rejects.toThrowError(ConflictException);
    });
  });
});
