const btnScoring = document.getElementById("btnscoring");
const nameInputSection = document.getElementById("nameinputsection");
const btnnamesubmit= document.getElementById("namesubmit");
const nameInput= document.getElementById("name");
const lblsubmitresult= document.getElementById("lblsubmitresult");
const btnheaderboard= document.getElementById("btnheaderboard");
const scoretablesection= document.getElementById("scoretablesection");
const tableerror= document.getElementById("tableerror");


function handlescoringClick()
{
     if (nameInputSection.style.display === "none" || nameInputSection.style.display === "") {
         nameInputSection.style.display = "block";
     } else {
         nameInputSection.style.display = "none";
         lblsubmitresult.innerText="";
     }

}

function handleheaderboardClick(){
    if(scoretablesection.style.display === "none" || scoretablesection.style.display === "") {
        scoretablesection.style.display = "block";
    } else {
        scoretablesection.style.display = "none";
    }
}

function handlenamesubmitClick(){
    if(nameInput.value.trim() != ""){
      const playerscore=Math.floor(Math.random() * 100); 
       axiosPostScore(nameInput.value,playerscore);
    }
   else{
    lblsubmitresult.innerText="Please enter a valid name.";
   }


}
function axiosPostScore(name,score){
    const formData = new FormData();
    formData.append('name', name);
    formData.append('score', score);
    axios.post('http://localhost:8080/soltaire/Backend/apis/PostPlayer',formData)
      .then(function (response) 
      { 
        const data = response.data;
        if(data.status==="success"){
        lblsubmitresult.innerText="Mabrouk "+name+" your score of "+score+" has been submitted!";
        }
        else{
        lblsubmitresult.innerText="Error submitting score: "+data.message;
        }
      })
      .catch(function (error) {
        
        lblsubmitresult.innerText="Error submitting score. Please try again.";
        console.error('Error submitting score:', error);
      });}

function axiosGetScores(){
  try{
    axios.get('http://localhost:8080/soltaire/backend/apis/gettopplayer')
      .then(function (response){
          const data = response.data;
        if(data.status==="success")
        {
            data.players.array.forEach(player => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${player.id}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>`;
                document.getElementById("scoretablebody").appendChild(row);
                
                
            });
        }else{
            tableerror.style.display="block";
            tableerror.innerText="Error fetching scores: "+data.message;


        }

      })
    
    }catch(error){
        console.error('Error fetching scores:', error);
        tableerror.style.display="block";
        tableerror.innerText="Error fetching scores. Please try again.";
    }
}

btnScoring.addEventListener("click", handlescoringClick);
btnnamesubmit.addEventListener("click", handlenamesubmitClick);
nameInput.addEventListener("input", function() {
lblsubmitresult.innerText="";
});