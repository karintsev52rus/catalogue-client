const OrderDataItem: React.FC<{label: string, value: string}> = ({label, value})=>{

    return (
        <div className="cust_data_item">
            <div className="cust_data_prop">
                {label}
            </div>
            <div className="cust_data_value">
                {value}
            </div>
        </div>
    )
}

export {OrderDataItem}