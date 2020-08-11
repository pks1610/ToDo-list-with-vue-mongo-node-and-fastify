new Vue({
    el: '#app',
    data: {
        showForm: false,
        showTable: true,
        formData: {},
        todoData: {}
    },
    methods: {
        // this method is for opening form
        openForm: function () {
            this.showForm = true;
            this.showTable = false;
        },
        // this method is for opening table
        openTable: function () {
            axios.get('http://127.0.0.1:3000/fetchTodoList')
            .then(response => {
                this.todoData = (response.data);
            });
            this.showForm = false;
            this.showTable = true;
        },
        // this method is form submitting form
        submitForm: function () {
            var taskName = this.$refs.taskName.value;
            var dueDate = this.$refs.dueDate.value;
            var priority = this.$refs.priority.value;
            var description = this.$refs.description.value;
            if(taskName && dueDate && priority && description){
                this.formData = {
                    'taskName': taskName,
                    'dueDate': dueDate,
                    'priority': priority,
                    'description': description
                };
                let api = axios.create({
                    baseURL: 'http://127.0.0.1:3000/getTodoForm',
                    method: 'post',
                    headers: {
                        'Access-Control-Allow-Origin': false
                    },
                    timeout: 100000
                });
                api.post('', this.formData)
                .then(response => {
                    alert('Form Submitted');
                    this.showForm = false;
                }).catch(error => {
                    console.log('error',error.toJSON())
                    alert('Something went wrong!')
                });
                // axios.post('http://127.0.0.1:3000/getTodoForm', this.formData)
                // .then((response) => {
                //     console.log(response);
                // });
            }else{
                alert('Please fill all * fields');
            }
        }
    },
    beforeMount(){
        this.openTable();
    }
});