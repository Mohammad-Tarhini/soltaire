const btnScoring = document.getElementById("btnscoring");
const nameInputSection = document.getElementById("nameinputsection");
function handlescoringClick()
{
     if (nameInputSection.style.display === "none" || nameInputSection.style.display === "") {
         nameInputSection.style.display = "block";
     } else {
         nameInputSection.style.display = "none";
     }

}

btnScoring.addEventListener("click", handlescoringClick);