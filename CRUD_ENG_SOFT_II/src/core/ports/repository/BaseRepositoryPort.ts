export interface BaseRepositoryPort<CreateInDataType, UpdateInDataType, OutDataType> {
    getAll(): Promise<OutDataType[]>;
    getById(id: string): Promise<OutDataType>;
    create(data: CreateInDataType): Promise<OutDataType>;
    update(id: string, data: UpdateInDataType): Promise<OutDataType>;
    deleteById(id: string): Promise<OutDataType>;
}