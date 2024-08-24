import React, { useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

export default function Radio({chonTrangThai, trangThai}) {

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1',
            label: 'Hoạt động',
            value: '0'
        },
        {
            id: '2',
            label: 'Ngưng hoạt động',
            value: '1'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState('1');

    useEffect(() => {
        if (trangThai == 0 || trangThai == 1) {
            setSelectedId('' + (trangThai+1));
        } else {
            setSelectedId('1');
        }
    }, [trangThai])

    return (
            <RadioGroup 
            containerStyle={{alignItems: 'flex-start', marginLeft: 10, marginTop: 5}}
            radioButtons={radioButtons} 
            onPress={item => {
                setSelectedId(item);
                chonTrangThai(item);
                console.log("Radio khi được chọn: ", selectedId)
                console.log("TrangThai khi được chọn", item)
            }}
            selectedId={selectedId}
        />
    );

}