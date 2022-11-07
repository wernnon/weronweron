import { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import {auth, db} from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import './admin.css'
import { async } from '@firebase/util';
function Admin(){
    const[tarefaInput, setTatefaInput] = useState('');
    const[user, setUser] = useState({})
    const[tarefas, setTarefas] = useState([]);

    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))
            
            if(userDetail){
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, 
                    orderBy("created", "desc"),
                    where("userUid", "==", data?.uid))
                    const unsub = onSnapshot(q,(snapshot)=>{
                        let lista = [];
                        snapshot.forEach((doc)=>{
                            lista.push({
                                id: doc.id,
                                tarefa: doc.data().tarefa,
                                userUid: doc.data().userUid
                            })
                        })
                        console.log(lista)
                        setTarefas(lista)
                    })
            }
        }
        
        loadTarefas();
    }, [])
    
    async function handleLogout(){
        await signOut(auth)
    }
    async function handleRegister(e){
        e.preventDefault();
        if(tarefaInput == ''){
            alert("Digite sua tarefa") 
            return;
        }
        await addDoc(collection(db, 'tarefas'),{
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            console.log("Tarefa registrada")
            setTatefaInput('')
        })
        .catch((error)=>{
            console.log("Erro ao Registrar " + error)
        })
    }
    return(
        <div className="admin-container">
           <h1>Minhas tarefas</h1>
           <form className="form" onSubmit={handleRegister}>
            <textarea
            placeholder="Digite sua tarefa"
            value={tarefaInput}
            onChange={(e)=> setTatefaInput(e.target.value)}
            />
            <button type="submit">Registrar tarefa</button>
           </form>
           <article className='list'>
            <p>Estudar JavaScript com React</p>
            <div>
                <button>Editar</button>
                <button  className='btn-delete'>Concluir</button>
            </div>
           </article>
           <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}
export default Admin;