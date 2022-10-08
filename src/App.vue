<template>
  <div class="badass-todo">
    <div class="title has-text-centered">
      Lista de cosas por hacer
    </div>

    <form
      @submit.prevent="addTodo"
    >
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
        <input v-model="newTodoContent" class="input" type="text" placeholder="Agrega algo por hacer">
        
        </p>
        <butto class="control">
          <button
            :disabled="!newTodoContent"
            class="button is-info">Añadir</button>
        </butto>
      </div>
      
    </form>


    <div v-for="tarjeta in lista" class="card mb-5" :class="{ 'has-background-success-light' : tarjeta.done }">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              :class="{'has-text-success line-through' : tarjeta.done}"
              class="column">
              {{ tarjeta.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button 
                @click="checkButton(tarjeta.id)"
                :class="tarjeta.done ? 'is-success' : 'is-light'"
                class="button">
                &check;
              </button>
              <button 
                @click="deleteTodo(tarjeta.id)"
                class="button is-danger ml-2">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
  import{ db } from '@/firebase'

  const todosCollectionRef = collection(db, 'todos')

  const lista = ref([
  // {
  //     id: 'id1',
  //     content: "Reunion a las 3",
  //     done: false
  //   },
  //   {
  //     id: 'id2',
  //     content: "Lavar la ropa",
  //     done: true
  //   }
  ])

  onMounted(() => {
    // const querySnapshot = await getDocs(collection(db, 'todos'))
    // let fbTodos = []
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, ' => ', doc.data())
    //     const todo = {
    //       id: doc.id,
    //       content: doc.data().content,
    //       done: doc.data().done
    //     }
    //     fbTodos.push(todo)
    //   })
    //   lista.value = fbTodos

    onSnapshot(todosCollectionRef, (querySnapshot) => {
      const fbTodos = []
      querySnapshot.forEach((doc) => {
        const todo = {
           id: doc.id,
           content: doc.data().content,
           done: doc.data().done
         }
         fbTodos.push(todo)
       })
       lista.value = fbTodos
    })
  })
  
  const newTodoContent = ref('')

  const addTodo = () => {
    addDoc(todosCollectionRef, {
      content: newTodoContent.value,
      done: false
    })
    // const newTodo = {
    //   id: uuidv4(),
    //   content: newTodoContent.value,
    //   done: false
    // }
    // lista.value.unshift(newTodo)
    newTodoContent.value = ''
  }

  //ELIMINAR
  const deleteTodo = id =>{
    deleteDoc(doc(todosCollectionRef, id))
  }

    //chech
    const checkButton = id =>{
      const index = lista.value.findIndex(lista => lista.id === id)

      updateDoc(doc(todosCollectionRef, id), {
        done: !lista.value[index].done
      })
      // lista.value[index].done ? true : false
    }
    

</script>

<style>
  @import 'bulma/css/bulma.min.css';

  .badass-todo{
    max-width: 400px;
    padding: 20px;
    margin: 0 auto;
  }
  .line-through{
    text-decoration-line: line-through;
  }
</style>
