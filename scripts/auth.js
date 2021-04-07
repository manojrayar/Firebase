const mymodals=document.querySelector(".modal")
const mymodal2=document.querySelector("#modal2")

function signup(e){
    e.preventDefault()
    const email=document.querySelector("#email")
    const pass=document.querySelector("#password")
    const cpass=document.querySelector("#cpassword")

    if(pass.value===cpass.value)
    {
        console.log(email.value,pass.value)

        firebase.auth().createUserWithEmailAndPassword(email.value, pass.value)
        .then((userCredential) => {
            var user = userCredential.user;
            M.toast({html:`Welcome ${user.email} `,classes:"rounded green lighten-1"})
            console.log(user)
            M.Modal.getInstance(mymodal2).close()
        })
        .catch((error) => {
            var errorMessage = error.message;
            M.toast({html: errorMessage,classes:"#ef5350 red lighten-1 rounded"})
            console.log(errorMessage)
        });

    }
    else{
        M.toast({html:"Password does't match",classes:"rounded red lighten-1"})
    }

}
function login(e){
    e.preventDefault()
    const email=document.querySelector("#lemail")
    const pass=document.querySelector("#lpassword")

    console.log(email.value,pass.value)

    firebase.auth().signInWithEmailAndPassword (email.value, pass.value)
    .then((userCredential) => {
        var user = userCredential.user;
        M.toast({html:`Welcome ${user.email} `,classes:"rounded green lighten-1"})
        console.log(user)
        M.Modal.getInstance(mymodals).close()

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log(user)
            } else {
                console.log("Signed out")
                // M.toast({html: "Logged out sucessfully",classes:"#ef5350 green lighten-1 rounded"})
            }
          });
    })
    .catch((error) => {
        var errorMessage = error.message;
        M.toast({html: errorMessage,classes:"#ef5350 red lighten-1 rounded"})
        console.log(errorMessage)
    });
}

function logout(){
    firebase.auth().signOut()
    .then(()=>{
        M.toast({html: "Logged out sucessfully",classes:"#ef5350 green lighten-1 rounded"})

    })
    .catch((err)=>{
        M.toast({html: "Something went wrong",classes:"#ef5350 red lighten-1 rounded"})
        console.log(err)
    })

}

function loginGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
       console.log(result)
        // ...
    }).catch((error) => {
       console.log(error)
    });
}


  