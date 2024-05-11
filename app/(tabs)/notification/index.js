import { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import { socket } from '../../../App';

const index = () => {
    const [isNotify, setIsNotify] = useState(false);
    const [commentNotify, setCommentNotify] = useState();
    useEffect(()=>{
        socket.on("comment", (data)=>{
            setIsNotify(true);
            console.log('data: ', data);
            setCommentNotify(data);
        })
    }, [])
    return (
        <View style={{backgroundColor: '#fff'}}>
            {isNotify && <View>
                <Text>{commentNotify?.name} đã comment về bài viết của bạn</Text>
                </View>}
        </View>
    )
}

export default index;