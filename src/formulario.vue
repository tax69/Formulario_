<template>
  <div class="badass-todo">

    <div class="card mb-5">
      <header class="card-header">
          <p class="card-header-title is-4">
           Formulario de Inscripción
          </p>
      </header>
      <div class="card-content">
          <div class="content">
              <form
                  @submit.prevent="addTodo"
              >
              <div class="field is-horizontal">
                  <div class="field-label is-normal">
                      <label class="label">Información personal</label>
                  </div>
                  <div class="field-body">
                      <div class="field">
                      <p class="control is-expanded has-icons-left">
                          <input v-model="nombreForm" class="input" type="text" placeholder="Nombre">
                          <span class="icon is-small is-left">
                          <i class="fas fa-user"></i>
                          </span>
                      </p>
                      </div>
                      <div class="field">
                      <p class="control is-expanded has-icons-left has-icons-right">
                          <input v-model="correoForm" class="input is-success" type="email" placeholder="Correo">
                          <span class="icon is-small is-left">
                          <i class="fas fa-envelope"></i>
                          </span>
                          <span class="icon is-small is-right">
                          <i class="fas fa-check"></i>
                          </span>
                      </p>
                      </div>
                  </div>
                  </div>

                  <div class="field is-horizontal">
                  <div class="field-label"></div>
                  <div class="field-body">
                      <div class="field is-expanded">
                      <div class="field has-addons">
                          <p class="control">
                          <a class="button is-static">
                              +502
                          </a>
                          </p>
                          <p class="control is-expanded">
                          <input v-model="telefonoForm" class="input" type="tel" placeholder="Teléfono">
                          </p>
                      </div>
                      </div>
                  </div>
                  </div>

                  <div class="field is-horizontal">
                  <div class="field-label is-normal">
                      <label class="label">Departamento</label>
                  </div>
                  <div class="field-body">
                      <div class="field is-narrow">
                      <div class="control">
                          <div class="select is-fullwidth">
                          <select v-model="departamentoForm">
                              <option>Alta Verapaz</option>
                              <option>Baja Verapaz</option>
                              <option>Chimaltenago</option>
                              <option>Chiquimula</option>
                              <option>Guatemala</option>
                              <option>El Progreso</option>
                              <option>Escuintla</option>
                              <option>Huehuetenango</option>
                              <option>Izabal</option>
                              <option>Jalapa</option>
                              <option>Jutiapa</option>
                              <option>Petén</option>
                              <option>Quetzaltenango</option>
                              <option>Quiché</option>
                              <option>Retalhuleu</option>
                              <option>Sacatepequez</option>
                              <option>San Marcos</option>
                              <option>Santa Rosa</option>
                              <option>Sololá</option>
                              <option>Suchitepequez</option>
                              <option>Totonicapán</option>
                              <option>Zacapa</option>
                          </select>
                          </div>
                      </div>
                      </div>
                  </div>
                  </div>

                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">¿pago?</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <label class="checkbox">
                                <input v-model="pagoForm" type="checkbox">
                                    marcar si la persona ya realizo el pago
                            </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                <div class="field-label">
                <label class="label">¿institucional?</label>
                </div>
                <div class="field-body">
                <div class="field is-narrow">
                <div class="control">
                    <label class="checkbox">
                    <input v-model="institucionForm" type="checkbox">
                        marcar si la persona viene de una institucion
                </label>
                </div>
                </div>
                </div>
                </div>

                <div class="field is-grouped is-grouped-centered">
                <p class="control">
                    <button 
                    :disabled="!nombreForm"
                    class="button is-primary mt-5">
                    Guardar
                    </button>
                </p>
                </div>     
              </form>
          </div>
      </div>
      </div>
  
    <div v-for="tarjeta in lista" class="card mb-5" :class="{ 'has-background-success-light' : tarjeta.pago }">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              :class="{'has-text-success line-through' : tarjeta.pago}"
              class="column">
              {{ tarjeta.nombre }}
            </div>
            <div class="column is-5 has-text-right">
              <button 
                @click="checkButton(tarjeta.id)"
                :class="tarjeta.pago ? 'is-success' : 'is-light'"
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
             nombre: doc.data().nombre,
             pago: doc.data().pago
           }
           fbTodos.push(todo)
         })
         lista.value = fbTodos
      })
    })
    
    // const newTodoContent = ref('')
    const nombreForm = ref('')
    const correoForm = ref('')
    const telefonoForm = ref('')
    const departamentoForm = ref('')
    const pagoForm = ref(false)
    const institucionForm = ref(false)
  
    const addTodo = () => {
      addDoc(todosCollectionRef, {
        nombre: nombreForm.value,
        correo: correoForm.value,
        telefono: telefonoForm.value,
        departamento: departamentoForm.value,
        institucion: institucionForm.value,
        pago: pagoForm.value
        
      })
      // const newTodo = {
      //   id: uuidv4(),
      //   content: newTodoContent.value,
      //   done: false
      // }
      // lista.value.unshift(newTodo)
      nombreForm.value = ''
      correoForm.value = ''
      telefonoForm.value = ''
      departamentoForm.value = ''
      pagoForm.value = false
      institucionForm.value = false

    }
  
    //ELIMINAR
    const deleteTodo = id =>{
      deleteDoc(doc(todosCollectionRef, id))
    }
  
      //chech
      const checkButton = id =>{
        const index = lista.value.findIndex(lista => lista.id === id)
  
        updateDoc(doc(todosCollectionRef, id), {
          pago: !lista.value[index].done
        })
        // lista.value[index].done ? true : false
      }
      
  
  </script>
  
<style>
    @import 'bulma/css/bulma.min.css';
  
    .badass-todo{
      max-width: 800px;
      padding: 20px;
      margin: 0 auto;
    }
    .line-through{
      text-decoration-line: line-through;
    }
  </style>
  