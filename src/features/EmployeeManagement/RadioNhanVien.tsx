import React, { useEffect, useMemo, useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

export default function Radio({ choiseRole, userRole }) {
    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1',
            label: 'Quản trị viên',
            value: 'admin'
        },
        {
            id: '2',
            label: 'Nhân viên',
            value: 'staff'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState('1');

    useEffect(() => {
        if (userRole === 'admin') {
            setSelectedId('1');
        } else if (userRole === 'staff') {
            setSelectedId('2');
        } else {
            setSelectedId('1');
            choiseRole('admin');
        }
    }, [userRole]);

    const handlePress = (id: string) => {
        setSelectedId(id);
        const selectedValue = radioButtons.find(button => button.id === id)?.value;
        choiseRole(selectedValue);
        console.log("Radio khi được chọn: ", id);
        console.log("Value khi được chọn: ", selectedValue);
    };

    return (
        <RadioGroup
            containerStyle={{ alignItems: 'flex-start', marginLeft: 10, marginTop: 5 }}
            radioButtons={radioButtons}
            onPress={handlePress}
            selectedId={selectedId}
        />
    );
}
