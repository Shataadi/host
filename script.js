document.getElementById('search').addEventListener('input', function() {
    let searchValue = this.value.toLowerCase();
    let items = document.querySelectorAll('.resourceitem');
    items.forEach(function(item) {
        let title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchValue)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});   


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('questionform');
    const questionsList = document.getElementById('questionslist');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const questionText = document.getElementById('question').value;
        
        const questionItem = document.createElement('div');
        questionItem.className = 'questionitem';
        
        questionItem.innerHTML = `
            <strong>${username}</strong>
            <p>${questionText}</p>
            <form class="reply-form">
                <label for="reply">Reply:</label>
                <textarea id="reply" rows="2"></textarea>
                <button type="submit">Post Reply</button>
            </form>
            <div class="replies"></div>
        `;
        
        const replyForm = questionItem.querySelector('.replyform');
        replyForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const replyText = replyForm.querySelector('textarea').value;
            const repliesDiv = questionItem.querySelector('.replies');
            
            const replyItem = document.createElement('div');
            replyItem.className = 'replyitem';
            replyItem.innerHTML = <p>${replyText}</p>;
            
            repliesDiv.appendChild(replyItem);
            replyForm.querySelector('textarea').value = '';
        });
        
        questionsList.appendChild(questionItem);
        form.reset();});
});

const login_form=document.getElementById("Login-Form");
const user=document.getElementById("user");
const pass=document.getElementById("pass");
 
login_form.addEventListener('submit', (e) =>{ e.preventDefault();
 
    const email= user.value.trim();
    const password = pass.value.trim();
   
 
   if ( email ==='' || password==='' ){
    alert("please fill all the fields")
    warn("Are you human")
   }
   else{
    alert(" Login success")
    window.location.href="home(core).html";
   }
 
 
});