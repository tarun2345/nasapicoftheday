
let apikey = `4zRJL9QGJA4e0UwerISHnTqkd9crWt43tdtsBI6H`

const currentDate = new Date().toISOString().split("T")[0]; 


getCurrentImageOfTheDay(currentDate)

async function getCurrentImageOfTheDay(currentDate){
    let url = `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apikey}`;
    try{
        let response = await fetch(url);
        if(!response.ok){
            throw new Error('Request failed with status '+ response.status);
        }
        let data = await response.json();
        loadData(data);

    }
    catch(error){
        console.error('Error : ',error.message);
    }
}


let section = document.getElementById('current-image-container');


function loadData(data){
    section.innerHTML = ''
    section.innerHTML = `<h1>Picture On ${data.date}</h1>
                         <img src="${data.hdurl}" alt="picoftheday">
                         <h2>${data.title}</h2>
                         <p>${data.explanation}</p>`
    
}

let inputDate = document.getElementById('search-input');


document.getElementById('search-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    if(inputDate.value === ''){
        document.getElementById('error').style.display = 'block';
        setTimeout(()=>{
            document.getElementById('error').style.display = 'none';
        },5000)
        return;
    }

    if(new Date(inputDate.value) > new Date(currentDate)){
        document.getElementById('error2').style.display = 'block';
        setTimeout(()=>{
            document.getElementById('error2').style.display = 'none';
        },8000)
        return;
    }


    getCurrentImageOfTheDay(inputDate.value);
    saveSearch(inputDate.value.toString());
})

let searches = [];
localStorage.setItem('searches',JSON.stringify(searches));

function saveSearch(searchedDate){
    searches = JSON.parse(localStorage.getItem('searches'));

    let date = searchedDate.toString();
    let flag = true;
    searches.forEach((item)=>{
        if(item.date === date){
            flag = false;
        }
    })
    if(flag){
        let obj = {
            date:date,
        }
        searches.unshift(obj);
    }

    localStorage.setItem('searches',JSON.stringify(searches))
    addSearchToHistory()

}

function addSearchToHistory(){
    searches = JSON.parse(localStorage.getItem('searches'));

    let ul = document.getElementById('seach-history');
    ul.innerHTML = ''
    searches.forEach((item)=>{
        let newli = document.createElement('li')
        newli.innerText = item.date;
        newli.addEventListener('click',(event)=>{
            let date = event.target.innerText;
            console.log(date)
            getCurrentImageOfTheDay(date);
        })
        ul.appendChild(newli);
    })
}