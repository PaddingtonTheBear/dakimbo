/**
 * Interface that describes fields that will be expected to be available on any database table, including metadata
 */
export interface IDataBaseObj {
    /**
     * The name of the table or collection that data is stored in
     */
    tableName?: string;
    
    id: string;
}