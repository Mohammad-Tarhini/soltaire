
const btnScoring = document.getElementById("btnscoring");
const nameInputSection = document.getElementById("nameinputsection");
const btnnamesubmit= document.getElementById("namesubmit");
const nameInput= document.getElementById("name");
const lblsubmitresult= document.getElementById("lblsubmitresult");
const btnheaderboard= document.getElementById("btnheaderboard");
const scoretablesection= document.getElementById("scoretablesection");



function handlescoringClick()
{
     if (nameInputSection.style.display === "none" || nameInputSection.style.display === "") {
         nameInputSection.style.display = "block";
         scoretablesection.textContent="";
         scoretablesection.style.display="none";    
     } else {
         nameInputSection.style.display = "none";
         lblsubmitresult.innerText="";
     }

}

function handleheaderboardClick(){
    if(scoretablesection.style.display === "none" || scoretablesection.style.display === "") {
        scoretablesection.style.display = "block";
        nameInputSection.style.display="none";
        axiosGetScores()

    } else {
        scoretablesection.style.display = "none";
        scoretablesection.textContent="";
        
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
    axios.post('http://localhost:8080/soltaire/backend/apis/PostPlayer.php',formData)
      .then(function (response) 
      { 
        const data = response.data;
        if(data.status==="success"){
        lblsubmitresult.innerText="Mabrouk "+name+" your score of "+score+" has been submitted!";
        nameInput.value="";
        }
        else{
        lblsubmitresult.innerText="Error submitting score: "+data.message;
        console.error(data.message)
        }
      })
      .catch(function (error) {
        
        lblsubmitresult.innerText="Error submitting score. Please try again.";
        console.error('Error submitting score:', error + data.message);
      });}

function axiosGetScores(){
  try{
    axios.get('http://localhost:8080/soltaire/backend/apis/gettopplayer.php')
      .then(function (response){
          const data = response.data;
        if(data.status==="success")
        {
          if(data.players.length==0){
            scoretablesection.style.display="block";
            scoretablesection.textContent="no data"

          }
          else{
            scoretablesection.style.display="block";
            const table=document.createElement("table");
            table.className="scoretable";

            const thead=document.createElement("thead");
            const headerRow=document.createElement("tr");
            ["Rank","name","score"].forEach(h=>{
              const th=document.createElement("th");
              th.textContent=h;
              headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody=document.createElement("tbody");

            data.players.forEach(player => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${player.id}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>`;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
            scoretablesection.appendChild(table);
            
          }
        }else{
            
            scoretablesection.style.display="block";
           scoretablesection="Error fetching scores: "+data.message;


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

btnheaderboard.addEventListener("click",handleheaderboardClick);

nameInput.addEventListener("input", function() {
lblsubmitresult.innerText="";
});