let tab_matiere = new Array();

function checkMatiere(choix)
{
	let choixUtilisateur = choix.value;

	let lesCheckbox = document.querySelectorAll('#check');
	console.log(lesCheckbox);

	let lesLogins = Object.keys(logins);
	
	if(choix.checked)
	{
		tab_matiere.push(choixUtilisateur);
		affichageTableau(choixUtilisateur);
	}
	else if(!choix.checked && tab_matiere.length == 1)
	{
		tab_matiere.splice(tab_matiere.indexOf(choix.value),1);
		affichageTableauVide();
	}
	else
	{
		tab_matiere.splice(tab_matiere.indexOf(choix.value),1);
		affichageTableau(choixUtilisateur);
	}


	console.log(tab_matiere);
}

function affichageTableauVide()
{
	let titre_matiere = document.getElementById('titre_matiere');
	let tableau_classement = document.getElementById('tableau_classement');

	let titre = "<h3>Résultat en : " + tab_matiere + "</h3>";
	titre_matiere.innerHTML = titre;

	let tableau =   "<table class='table table-striped table-sm'>" +
						"<thead>" +
							"<tr><th colspan='6'>Classement des élèves</th></tr>" +
							"<tr><th>INDEX</th><th>LOGIN</th><th>NOM</th><th>SCORE</th><th>PSCORE</th><th>TOTAL</th></tr>" +
						"</thead>" +
					"</table>";
	tableau_classement.innerHTML = tableau;
}

function affichageTableau(choixUtilisateur)
{
	let titre_matiere = document.getElementById('titre_matiere');
	let tableau_classement = document.getElementById('tableau_classement');

	let titre = "<h3>Résultat en : " + tab_matiere + "</h3>";
	titre_matiere.innerHTML = titre;

	let i = 0;
	let tableau =   "<table class='table table-striped table-sm'>" +
						"<thead>" +
							"<tr><th colspan='6'>Classement des élèves</th></tr>" +
							"<tr><th>INDEX</th><th>LOGIN</th><th>NOM</th><th>SCORE</th><th>PSCORE</th><th>TOTAL</th></tr>" +
						"</thead>" +
						"<tbody>" + affichageLigneClassement() + "</tbody>" +
					"</table>";        
	tableau_classement.innerHTML = tableau;
}

function affichageLigneClassement()
{  
	let classement = doClassementAlgo1(tab_matiere);
	let suite = "";
	
	for (let i = classement.length - 1; i >= 0; i--)
	{
		let infoEleve = classement[i];
		let str = "<tr><td>" + i + "</td><td>" + infoEleve.login + "</td><td>" + infoEleve.nom + "</td><td>" + infoEleve.score + "</td><td>" + infoEleve.pscore + "</td><td>" + infoEleve.scoreTotal + "</td></tr>";
		suite = str.concat(suite);
	}

	return suite;
}