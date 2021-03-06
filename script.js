//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var firstIteration = false;
var counter = 0;
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	if(counter === 0 && firstIteration === false){

		var nom = $("#nom").val(),
			motDePasse = $("#mot_de_passe").val(),
			motDePasseConfirmation = $("#mot_de_passe_confirmation").val(),
			contactNom = $("#contact_nom").val(),
			contactPrenom = $("#contact_prenom").val(),
			siret = $("#siret").val(),
			codePostal = $("#code_postal").val(),
			ville = $("#ville").val(),
			adresse = $("#adresse").val(),
			contactTelephone = $("#contact_telephone")
			id = getParameterByName('id'),
			site = getParameterByName('site'),
			env = getParameterByName('env');

		toggleLoading();
		$.ajax({
			type: "POST",
			url: '.netlify/functions/post',
			data: {
				'id': id,
				'site': site,
				'env': env,
				'nom': nom,
				'mot_de_passe': motDePasse,
				'mot_de_passe_confirmation': motDePasseConfirmation,
				'contact_nom': contactNom,
				'contact_prenom': contactPrenom,
				'siret': siret,
				'codePostal': codePostal,
				'ville': ville,
				'adresse': adresse,
				//'contact_telephone': contactTelephone
			},
			success: function(res){
				counter++;
				firstIteration = true;
				//show the next fieldset
				next_fs.show();
				//hide the current fieldset with style
				current_fs.animate({opacity: 0}, {
					step: function(now, mx) {
						//as the opacity of current_fs reduces to 0 - stored in "now"
						//1. scale current_fs down to 80%
						scale = 1 - (1 - now) * 0.2;
						//2. bring next_fs from the right(50%)
						left = (now * 50)+"%";
						//3. increase opacity of next_fs to 1 as it moves in
						opacity = 1 - now;
						current_fs.css({
							'transform': 'scale('+scale+')',
							'position': 'absolute'
						});
						next_fs.css({'left': left, 'opacity': opacity});
					},
					duration: 800,
					complete: function(){
						current_fs.hide();
						animating = false;
					},
					//this comes from the custom easing plugin
					easing: 'easeInOutBack'
				});
				generateIframe(site,env,id);
				toggleLoading();
				//todo add end loading
			},
			error: function(res){
				toggleLoading();
				//todo handle error message
			}
		});
	}else{
		counter++;
		//show the next fieldset
		next_fs.show();
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
					'transform': 'scale('+scale+')',
					'position': 'absolute'
				});
				next_fs.css({'left': left, 'opacity': opacity});
			},
			duration: 800,
			complete: function(){
				current_fs.hide();
				animating = false;
			},
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	}

});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	counter--;
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})

function generateIframe(site,env,id) {
	$.ajax({
		type: "POST",
		url: '.netlify/functions/generate',
		data: {
			'site': site,
			'env': env,
			'id': id,
		},
		success: function(res){
			var json = JSON.parse(res);
			Swal.fire({
				title: 'Veuillez signer',
				icon: 'info',
				width: '90%',
				height: '90%',
				html:
					`<iframe id="ifrm" width="100%" height="100%" src="${json.data.signatureUrl}"></iframe>` ,
				showCloseButton: false,
				showCancelButton: false,
				focusConfirm: false,
			})
		},
		error: function(res){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: res.message,
			})
		}
	});
}

var loadingOverlay = document.querySelector('.loading');

function toggleLoading(){
	document.activeElement.blur();

	if (loadingOverlay.classList.contains('hidden')){
		loadingOverlay.classList.remove('hidden');
	} else {
		loadingOverlay.classList.add('hidden');
	}
}
