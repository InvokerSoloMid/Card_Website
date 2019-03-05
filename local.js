window.onload =function(){
    var elem=document.createElement('img');
    elem.src='src/me.jpg';
    var u=new User("Pickles", "Mr.", "Old Town", "066666666");
    u.picture=elem;
    users.push(u);
    users[0].getMessage(true);
    users=[];
    setInterval(getUser, 100);
    setInterval(ChooseUser, 5000);
}

var users=[];

function getUser() {
    let usr = new XMLHttpRequest();
    usr.open('GET', 'https://randomuser.me/api', true);
    usr.send();
    usr.onreadystatechange = ()=>{
        if (usr.readyState !=4) return;

        if (usr.status != 200) {
            console.log('404');
        } else {
            const user = JSON.parse(usr.responseText);
            const userN = new User(user.results[0].name.last, user.results[0].name.first, user.results[0].location.city, user.results[0].phone, user.results[0].picture);
            users.push(userN);
        }
    };
}

var count=0;

class User {
    constructor(firstname,lastname,city,phone,picture)
    {
        this.firstName = firstname;
        this.lastName = lastname;
        this.city = city;
        this.phone = phone;
        this.picture = picture;
    }

    getMessage(e) {
        let message;
        let msg = new XMLHttpRequest();
        msg.open('GET', 'https://www.randomtext.me/api', true);
        msg.send();

        msg.onreadystatechange = ()=>{
            if(msg.readyState !=4) return;

            if (msg.status != 200) {
                console.log('404');
            } else {
                message = JSON.parse(msg.responseText);
                if (e==true) this.addMessage(message.text_out, true);
                else
                this.addMessage(message.text_out);
            }
        }
    }

    addMessage(p, check) {
        let messages = document.querySelector('.chat');
        let messageContainer = document.createElement('div');

        let picture = document.createElement("img");
        let name = document.createElement('div');
        let message = document.createElement('div');
        message.classList.add("message");
        name.classList.add("name");


        if (check==true) picture.src='src/2.png'; 
        else
        picture.src = this.picture.medium;
        picture.classList.add("ava");
        name.innerHTML = `${this.lastName} ${this.firstName}`+":";
        message.innerHTML = p;

        messages.appendChild(picture);
        messageContainer.appendChild(name);
        messageContainer.appendChild(message);

        messages.appendChild(messageContainer);
    }
}

function ChooseUser(){
    if (users.length==0) return;
    var number=randomInteger(0,users.length);
    var temp=users[number];
    temp.getMessage();
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}

User.prototype.toString = function()
{
    return(this.firstName+" "+this.lastName+" "+this.city+" "+this.phone);
};



