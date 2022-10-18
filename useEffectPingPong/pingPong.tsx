import { useEffect, useRef, useState} from 'react';
import { Button } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const getValue = (stateSetter) =>
    new Promise((resolve) => 
        stateSetter((s) => {
            resolve(s);
            return s;
        })
    );

export default function Test() {
    const [count, setCount] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const ping = () => {
        socket.emit('ping');
    }

    useEffect(() => {
        socket.on('pong', () => {
            setIsDone(false);
            setCount((c) => c++);
            console.log('pong');
        });
        return () => {
            socket.off('pong');
        };
    }, []);

    useEffect(() => {
        socket.on('done', async () => {
            setIsDone(true);
            console.log(count);
        });
        return () => {
            socket.off('done');
        };
    }, []);

    useEffect(() => {
        if(isDone) console.log(count);
    }, [isDone, count]);

    return (
        <>
            <Head>
                <title>Testing</title>
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>
            {count}
            <Button onClick={() => ping()}>Ping</Button>
        </>
    );
}