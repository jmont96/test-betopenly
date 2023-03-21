import './App.css';
import {useEffect, useState} from "react";
import {getToken, getUser} from "./LoginService";

function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser().then(u => {
            setUser(u.data)
        })
    }, [])

    async function handleDfsRedirect() {
        try {
            const token = (await getToken(user._id)).data;
            console.log({token})
            localStorage.setItem('token', token.token)
            window.open('https://phantasia-frontend-staging.vercel.app/login?redirect=/home', '_blank');
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        async function handleMessage(e) {
            if (e.origin !== "https://phantasia-frontend-staging.vercel.app") {
                return;
            }
            const token = localStorage.getItem('token')
            const parent = window.parent;
            console.log('Posting Message', {key: 'token', value: token})
            parent.postMessage({key: 'token', value: token}, "https://phantasia-frontend-staging.vercel.app");
        }

        window.addEventListener("message", handleMessage);
    }, [])


    return (
        <div className={'w-screen min-h-screen flex pt-20 justify-center'}>
            <div className={'flex flex-col space-y-3 items-center mx-auto'}>
                {!user ? <>
                    <div className={'w-24 h-24 rounded-full bg-zinc-200 animate-pulse'}/>
                    <div className={'w-56 h-8 rounded-lg bg-zinc-200 animate-pulse'}/>
                    <div className={'w-56 h-8 rounded-lg bg-zinc-200 animate-pulse'}/>
                </> : <>
                    <img src={user.picture} className={'w-24 h-24 rounded-full'} alt={'profile'}/>
                    <span className={'text-md text-zinc-900 font-semibold'}>👋 Hello, {user.username}</span>
                    <span className={'text-3xl text-zinc-700 font-bold'}>💰 ${user.balance.toFixed(2)}</span>
                </>}

                <div className={'flex pt-10'}>
                    <button
                        onClick={handleDfsRedirect}
                        className={'cursor-pointer transition hover:bg-red-800 py-7 px-9 rounded-xl flex items-center justify-center bg-red-600 text-zinc-50 font-bold text-6xl'}>
                        PLAY DFS!!!!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
