
import { memo } from "react";
import "../Styles/GenericTable.css";

function GenericTable({ columns = [{ label: "", fieldName: "" }], data = [] }) {
    const fieldsNames = columns.map(col => col.fieldName);

    return (
        <div className="generic-table">
            <table>
                <thead>
                    <tr>
                        {columns && columns.map(col => (
                            <th key={col.fieldName}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            {fieldsNames.map(fieldName => (
                                <td key={fieldName}>{item[fieldName]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default memo(GenericTable);