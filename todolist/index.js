$(function () {
	// Task deleting
    $(document).on('click', '.delete-task', function (e) {
		$(this).parent('.task').remove();
        var totalSpanTag = $('.total>span');
        var oldValue = +(totalSpanTag.text());
        totalSpanTag.text(oldValue - 1);
	});
    
    // Task adding
    $('#tasks-adding').submit(function () {
        var input = $('#task-descr');
        if (input.val() !== "") {
            $('#tasks').append('<div class="task"><input type="checkbox"><span>' +
                               input.val() + '</span><button class="delete-task">X</button>');
            input.val("");
            var totalSpanTag = $('.total>span');
            var oldValue = +(totalSpanTag.text());
            totalSpanTag.text(oldValue + 1);
        }
        return false;
    });
    
    // Line-through and increment accomplished tasks value
    $(document).on('click', '.task>input:checkbox:checked', function () {
        $(this).siblings('span').first().css('text-decoration', 'line-through');
        var accomplishedSpanTag = $('.accomplished>span');
        var oldValue = +(accomplishedSpanTag.text());
        accomplishedSpanTag.text(oldValue + 1);
    });
    
    // Reverse actions to previous function
    $(document).on('click', '.task>input:checkbox:not(:checked)', function () {
        $(this).siblings('span').first().css('text-decoration', 'none');
        var accomplishedSpanTag = $('.accomplished>span');
        var oldValue = +(accomplishedSpanTag.text());
        accomplishedSpanTag.text(oldValue - 1);
    });
    
    // Marking all as done
    $('.mark-all').click(function () {
         $('.task>input:checkbox').click();
    });
    
    // Deleting all tasks
    $('.delete-all').click(function () {
        $('.delete-task').click(); 
    });
    
    // Task editing
    $('#tasks').on('dblclick', '.task>span', function () {
        var $span = $(this);
        var spanText = $span.text();
        var $form = $('<form class="pure-form edition-form">');
        var $input = $('<input type="text">').val(spanText);
        $form.append($input);
        $span
            .text("")
            .append($form);
        $input.select();
    });
    
    function replaceInputWithText($form) {
        $input = $form.find('input').first();
        var newText = $input.val();
        $span = $form.parent();
        $form.remove();
        $span.text(newText);
        return false;
    }
    
    $(document).on('submit', 'form[class*=edition-form]', function () {
        replaceInputWithText($(this));
        return false;
    });
    
    $(document).on('click', function(event) {
        if (!$(event.target).closest('form[class*=edition-form').length) {
            replaceInputWithText($(this).find('form[class*=edition-form').first());
        }
    });
    
//    $(document).on('blur', 'form[class*=edition-form]>input', function() {
//        replaceInputWithText($(this).parent()); 
//        return false;
//    });
});