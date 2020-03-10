function doClassementAlgo2(tab_matiere)
{
	let classementGlobal = new Array();
	let personneVotants;
	
	for (let compteurMatiere = 0; compteurMatiere < tab_matiere.length; compteurMatiere++) 
	{
		let matiere = tab_matiere[compteurMatiere];
		console.log("System : lancement de la fonction classement pour : " + matiere);
		// Calcul du score par élève
			// On récupère les logins du tableau associatif lié à l'objet "logins" en les rangeant dans un tableau
			console.log("System : Récupération des logins en cours ...");
			let lesLogins = Object.keys(logins);
			console.log("Il y a " + lesLogins.length + " élèves"); // Nombre d'élèves total

			//Initialisation
				// On met en place le tableau associatif score, pscore et scoreTotal
				let score = new Object();
				let pscore = new Object();
				let scoreTotal = new Object();

				// On initialise le score et le pscore à 0 en parcourant les logins
				console.log("System : Initialisation du tableau score à 0 en cours ...");
				lesLogins.forEach
				(
					function(leLogin)
					{
						score[leLogin] = 0;
						pscore[leLogin] = 0;
						scoreTotal[leLogin] = 0;
					}
				);
				/*console.log(score);
				console.log("Il y a " + Object.keys(score).length + " élèves dans le tableau score");
				console.log(pscore);
				console.log("Il y a " + Object.keys(pscore).length + " élèves dans le tableau pscore");
				console.log(scoreTotal);
				console.log("Il y a " + Object.keys(scoreTotal).length + " élèves dans le tableau scoreTotal");*/

				// On initialise à 0 le compteur du nombre de personne qui ont votés
				personneVotants = 0;

			// On va calculer le score en parcourant les logins
			console.log("System : Décompte des scores en cours ...");
			lesLogins.forEach
			(
				function(leLogin)
				{
					// On test de prime abord si le login existe dans le tableau des votes
					if(votes[leLogin]) // Si oui le login a voté
					{
						let nbVotesLogin = votes[leLogin][matiere].length;
						/*console.log(leLogin + " a voté pour " + nbVotesLogin + " élève(s) : " + votes[leLogin][matiere]); // Affiche le nombre de vote du login actuel et ses votes*/
						
						// On parcourt les votes du login
						for(let i = 0; i < nbVotesLogin; i++)
						{
							let nomBulletin = votes[leLogin][matiere][i];

							// Pour chaque vote on rajoute +1 au score du login associé
							if(typeof score[nomBulletin] == 'undefined')
							{
								//console.log("1 bulletin jeté car l'élève : " + nomBulletin + " est inconnu");
							}
							else
							{
								// Pour chaque vote on rajoute + 1 diviser par le nombre de votes que l'élève a administré au score du login associé
								score[nomBulletin] += 1 / nbVotesLogin;
								/*console.log("1 bulletin administré pour : " + nomBulletin)*/
							}
						}
						personneVotants++;
					}
					else // Sinon le login n'a pas voté
					{
						/*console.log(leLogin + " n'a pas voté");*/
						
					}
				}
			);
			/*console.log(score);
			console.log("Il y a " + Object.keys(score).length + " élèves dans le tableau score");*/
			
			// On va calculer le pscore en reparcourant les logins afin d'appliquer le poid des votes
			console.log("System : Décompte du pscore ...");
			lesLogins.forEach
			(
				function(leLogin)
				{
					// On test de prime abord si le login existe dans le tableau des votes
					if(votes[leLogin]) // Si oui le login a voté
					{
						let nbVotesLogin = votes[leLogin][matiere].length;
						/*console.log(leLogin + " a voté pour " + nbVotesLogin + " élève(s) : " + votes[leLogin][matiere]); // Affiche le nombre de vote du login actuel et ses votes*/
						
						// On parcourt les votes du login
						for(let i = 0; i < nbVotesLogin; i++)
						{
							let nomBulletin = votes[leLogin][matiere][i];

							// Pour chaque vote on rajoute +1 au score du login associé
							if(typeof pscore[nomBulletin] == 'undefined')
							{
								/*console.log("1 bulletin jeté car l'élève : " + nomBulletin + " est inconnu");*/
							}
							else
							{
								// Pour chaque vote on rajoute le score du login qui a voté au login associé
								let nbPointVotant = score[leLogin];
								pscore[nomBulletin] += nbPointVotant;
								/*console.log(nbPointVotant + " points administré pour : " + nomBulletin)*/
							}
						}
					}
					else // Sinon le login n'a pas voté
					{
						/*console.log(leLogin + " n'a pas voté");*/
					}
				}
			);
			/*console.log(pscore);
			console.log("Il y a " + Object.keys(pscore).length + " élèves dans le tableau pscore");*/

			// On fait le score total
			console.log("System : Décompte du score total ...");
				// On parcourt les logins pour mettre en place le score total
				lesLogins.forEach
				(
					function(leLogin)
					{
						// On additionne le score et le pscore dans le tableau du scoreTotal pour le Login concerné
						scoreTotal[leLogin] = score[leLogin] + pscore[leLogin];
					}
				);
				/*console.log(scoreTotal);
				console.log("Il y a " + Object.keys(scoreTotal).length + " élèves dans le tableau scoreTotal");*/

			// On fait le classement
			console.log("System : Mise en place du classement ...");
			let classement = new Array();
				// On parcourt les logins pour mettre en place le classement
				lesLogins.forEach
				(
					function(leLogin)
					{
						let eleve = 
						{
							login: leLogin,
							nom: logins[leLogin],
							score: score[leLogin],
							pscore: pscore[leLogin],
							scoreTotal: scoreTotal[leLogin]
						};
						classement.push(eleve);
					}
				);
				/*console.log(classement);*/

				if (compteurMatiere == 0) // Si premier tour de boucle
				{
					// On met le classement dans classementGlobal
					for(let compteur = 0; compteur < classement.length; compteur++)
					{
						classementGlobal[compteur] = classement[compteur];
					}
				}
				else // Sinon
				{  
					// Faire la moyenne des score pour chaque ligne de classement (login) et le ranger dans classementGlobal
					for (let compteur = 0; compteur < classement.length; compteur++) 
					{
						let moyenneScore, moyennePscore, moyenneScoreTotal; // resultat des moyennes
						let a, b; // variable de calcul

						a = classement[compteur]['score'];
						b = classementGlobal[compteur]['score'];
						moyenneScore = (a + b) / 2;

						a = classement[compteur]['pscore'];
						b = classementGlobal[compteur]['pscore'];
						moyennePscore = (a + b) / 2;

						a = classement[compteur]['scoreTotal'];
						b = classementGlobal[compteur]['scoreTotal'];
						moyenneScoreTotal = (a + b) / 2;

						let eleve = 
						{
							login: classement[compteur]['login'],
							nom: classement[compteur]['nom'],
							score: moyenneScore,
							pscore: moyennePscore,
							scoreTotal: moyenneScoreTotal
						};
						classementGlobal.splice(compteur, 1, eleve);
					}
				}
	}

	// On tri pour terminer par ordre croissant le classement global
	classementGlobal.sort(tri_décroissant);

	// On rajoute l'élève PERSONNE! qui correspond au nombre d'élèves total qui ont votés 
	let eleve = 
	{
		login: 'PERSONNE!',
		nom: '_',
		score: '_',
		pscore: '_',
		scoreTotal: personneVotants
	};
	classementGlobal.unshift(eleve);

	console.log("Le classementGlobal est :");
	console.log(classementGlobal);
	return classementGlobal;
}

function tri_décroissant(a, b)
{
	return (b.scoreTotal - a.scoreTotal);   // Retourne positif si a < b, négatif ou nul si a > b
}
