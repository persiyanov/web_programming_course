$(document).ready(function() {
	$(document).on('click', '.delete-task', function(e) {
		$(this).parent('.task').css('display', 'none');
	})

	$(document).on('click', 'input[type=checkbox]', function(e) {
		var input = $(this);
		if (input.prop('checked') == true) {
			input.siblings('span').css('text-decoration', 'line-through');			
		} else {
			input.siblings('span').css('text-decoration', 'none');
		}
	})

	$('#add-task').click(function(e) {
		var input = $(this).siblings('input');
		var input_val = input.val();
		if (input_val != "") {
			$('#tasks').append('<div class="task"><input type="checkbox"><span> ' + 
				input_val + '</span><button class="delete-task">X</button>');
			input.val("");
		}
		
	})

	$('#task-descr').keypress(function(e) {
		if (e.which == 13) {
			e.preventDefault();
			var input_val = $(this).val();
			if (input_val != "") {
				$('#tasks').append('<div class="task"><input type="checkbox"><span> ' + 
					input_val + '</span><button class="delete-task">X</button>');
				$(this).val("");
			}
			return false;
		}
	})
});