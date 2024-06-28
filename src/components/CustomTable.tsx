import { Table } from 'flowbite-react';

interface Column {
    field: string;
    name: string;
}

interface Data {
    [key: string]: string;
}

interface Props {
    columns: Column[];
    data: Data[];
}

function CustomTable({ columns, data }: Props): JSX.Element {
    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    {columns.map((column, index) => (
                        <Table.HeadCell key={index}>{column.name}</Table.HeadCell>
                    ))}
                </Table.Head>
                <Table.Body className="divide-y">
                    {data.map((row, rowIndex) => (
                        <Table.Row key={rowIndex} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {columns.map((column, columnIndex) => (
                                <Table.Cell key={columnIndex}>{row[column.field]}</Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default CustomTable;
