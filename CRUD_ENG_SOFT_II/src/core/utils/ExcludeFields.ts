const excludeFieldsFromObject = <DataType>(
  fieldsToBeExcluded: string[],
  data: DataType
) => {
  const processedObject: any = { ...data };
  for (const fieldToBeExcluded of fieldsToBeExcluded) {
    delete processedObject[fieldToBeExcluded];
  }
  return processedObject;
};

const excludeFieldsFromArrayOfObject = <DataType>(
  fieldsToBeExcluded: string[],
  data: DataType[]
) => {
  return data.map((object) => {
    const processedObject: any = { ...object };
    for (const fieldToBeExcluded of fieldsToBeExcluded) {
      delete processedObject[fieldToBeExcluded];
    }
    return processedObject;
  });
};

export const excludeFields = <DataType>(
  fieldsToBeExcluded: string[],
  data: DataType | DataType[]
): DataType | DataType[] => {
  if (Array.isArray(data))
    return excludeFieldsFromArrayOfObject(fieldsToBeExcluded, data);

  return excludeFieldsFromObject(fieldsToBeExcluded, data);
};
