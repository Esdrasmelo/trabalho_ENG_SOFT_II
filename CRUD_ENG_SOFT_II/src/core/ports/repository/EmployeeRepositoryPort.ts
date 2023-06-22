import { CreateEmployeeIn, UpdateEmployeeIn, EmployeeOutData } from '../../models'
import { BaseRepositoryPort} from './BaseRepositoryPort'

export interface EmployeeRepositoryPort extends BaseRepositoryPort<CreateEmployeeIn, UpdateEmployeeIn, EmployeeOutData> {
    getByEmail(email: string): Promise<EmployeeOutData>
}