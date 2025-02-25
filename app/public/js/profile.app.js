    const Profile = ({
        data() {
            return {
             username: '',
             usercountry: '',
             useremail: '',
             userdob: '',
             userage: '',
             dob:'',
             userpic: ''
        }
    },
    computed: {
        prettyBirthday() {
            // return this.dob;
            console.log(this.dob);
            return dayjs(this.dob)
            .format('D MMM YYYY')
        }
    },
    methods: {
        fetchUserData() {
            fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(data =>  {
                var userdata = data.results[0];
                this.dob = userdata.dob.date;
                console.log(this.dob);
                console.log(userdata)
                this.username = userdata.name.first + " " + userdata.name.last;
                this.usercountry = userdata.location.country;
                this.useremail = userdata.email;
                this.userdob = userdata.dob.date.split("");
                this.userage = userdata.dob.age;
                this.userpic = userdata.picture.large;
    
            })
        }
    },

    created() {

        this.fetchUserData();   

        }
    })
Vue.createApp(Profile).mount('#usern');
